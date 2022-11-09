import { Reference, useMutation } from "@apollo/client";
import { ButtonUnstyledProps } from "@mui/base";
import clsx from "clsx";

import { Button, Icon } from "@components";
import { graphql } from "@lib/graphql";

import styles from "./FavoriteButton.module.scss";

const FavoritePokemon = graphql(`
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
      name
      types
      image
      isFavorite
    }
  }
`);

const UnFavoritePokemon = graphql(`
  mutation UnFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      name
      isFavorite
    }
  }
`);

function useFavorite() {
  return useMutation(FavoritePokemon, {
    update(cache, { data }) {
      const response = data?.favoritePokemon;
      if (!response) return;

      cache.modify({
        fields: {
          pokemons(existing, { storeFieldName }) {
            const listId = JSON.parse(storeFieldName.split(/pokemons:/g)[1]);
            const { search, filter } = listId.$query;
            const isMatchingType =
              !filter?.type ||
              filter.type === "" ||
              response.types.includes(filter?.type);
            const isMatchingSearch =
              !search ||
              search === "" ||
              new RegExp(search, "i").test(response.name);

            if (filter.isFavorite && isMatchingType && isMatchingSearch) {
              return {
                ...existing,
                edges: [...(existing.edges ?? []), response],
              };
            }
            return existing;
          },
        },
      });
    },
  });
}

function useUnFavorite() {
  return useMutation(UnFavoritePokemon, {
    update(cache, { data }) {
      const response = data?.unFavoritePokemon;
      if (!response) return;
      cache.modify({
        fields: {
          pokemons(existing, { storeFieldName, readField }) {
            if (!storeFieldName.match(/"isFavorite":true/g)) return existing;
            const filtered = existing.edges.filter(
              (pokemonRef: Reference) =>
                response.id !== readField("id", pokemonRef)
            );
            return { ...existing, edges: filtered };
          },
        },
      });
    },
  });
}

export interface FavoriteButtonProps extends ButtonUnstyledProps {
  isFavorite: boolean;
  pokemonId: string;
}

export const FavoriteButton = ({
  pokemonId,
  isFavorite,
  ...props
}: FavoriteButtonProps) => {
  const [favorite] = useFavorite();
  const [unFavorite] = useUnFavorite();

  const handleFavoriteClick = () => {
    isFavorite
      ? unFavorite({ variables: { id: pokemonId } })
      : favorite({ variables: { id: pokemonId } });
  };

  return (
    <Button {...props} onClick={handleFavoriteClick}>
      <Icon
        className={clsx(styles.icon, { [styles.favorited]: isFavorite })}
        name={isFavorite ? "favorite-filled" : "favorite"}
        label="favorite"
      />
    </Button>
  );
};
