import { useMutation } from "@apollo/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Icon, Button, PokemonType, FavoriteButton } from "@components/shared";
import { graphql } from "@lib/graphql";
import { ListPokemonsQuery } from "@lib/graphql/graphql";

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

export type PokemonSummary = ListPokemonsQuery["pokemons"]["edges"][0];

export interface PokemonCardProps {
  pokemon: PokemonSummary;
  onClick: (pokemon: PokemonSummary) => void;
  isPriorityImage?: boolean;
}

const _PokemonCard = ({
  pokemon,
  onClick,
  isPriorityImage,
}: PokemonCardProps) => {
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
      <FavoriteButton
        className={styles.favorite_button}
        onClick={handleFavoriteClick}
        filled={isFavorite}
      />

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
        <p className="subtitle">&#35;{id}</p>
        <div className={styles.pokemon_name_container}>
          <h2 className={styles.pokemon_name}>
            <Link
              href={`/?name=${name.toLowerCase()}`}
              as={`/detail/${name.toLowerCase()}`}
              onClick={() => onClick(pokemon)}
            >
              {name}
            </Link>
          </h2>
          {types.map((type) => (
            <PokemonType className={styles.type_icon} key={type} type={type} />
          ))}
        </div>
      </div>
    </li>
  );
};

const PokemonCard = React.memo(
  _PokemonCard,
  (prev, next) => prev.pokemon.id === next.pokemon.id
);
export { PokemonCard };
