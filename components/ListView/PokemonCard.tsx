import { useMutation } from "@apollo/client";
import clsx from "clsx";
import Image from "next/image";
import { default as NextLink } from "next/link";

import { graphql } from "@lib/graphql";
import { ListPokemonsQuery } from "@lib/graphql/graphql";

import { Icon, IconButton, PokemonTypeIcon } from "../shared";

import styles from "./ListView.module.scss";

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

export interface PokemonCardProps {
  pokemon: ListPokemonsQuery["pokemons"]["edges"][0];
  isPriorityImage?: boolean;
}

export const PokemonCard = ({ pokemon, isPriorityImage }: PokemonCardProps) => {
  const { id, name, image, types, isFavorite } = pokemon;

  const [favorite] = useMutation(FavoritePokemon);
  const [unFavorite] = useMutation(UnFavoritePokemon);

  const handleFavoriteClick = () => {
    isFavorite
      ? unFavorite({ variables: { id } })
      : favorite({ variables: { id } });
  };

  return (
    <li className={styles.card}>
      <IconButton
        className={styles.favorite_button}
        onClick={handleFavoriteClick}
      >
        <Icon
          className={clsx({ [styles.favorited]: isFavorite })}
          name={isFavorite ? "favorite-filled" : "favorite"}
          label="favorite"
        />
      </IconButton>
      <div className={styles.image_container}>
        <Image
          className={styles.pokemon_image}
          src={image}
          alt={`${name} artwork`}
          fill
          sizes="20rem"
          priority={isPriorityImage}
        />
      </div>
      <div>
        <p className={styles.pokemon_id}>&#35;{id}</p>
        <div className={styles.pokemon_name_container}>
          <h2 className={styles.pokemon_name}>
            <NextLink href={`/detail/${name.toLowerCase()}`}>{name}</NextLink>
          </h2>
          {types.map((type) => (
            <PokemonTypeIcon
              className={styles.type_icon}
              key={type}
              type={type}
            />
          ))}
        </div>
      </div>
    </li>
  );
};
