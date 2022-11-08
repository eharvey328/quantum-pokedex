import { useMutation } from "@apollo/client";
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

export interface FavoriteButtonProps extends ButtonUnstyledProps {
  isFavorite: boolean;
  pokemonId: string;
}

export const FavoriteButton = ({
  pokemonId,
  isFavorite,
  ...props
}: FavoriteButtonProps) => {
  const [favorite] = useMutation(FavoritePokemon);
  const [unFavorite] = useMutation(UnFavoritePokemon);

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
