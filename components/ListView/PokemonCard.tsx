import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { PokemonType, FavoriteButton } from "@components/shared";
import { ListPokemonsQuery } from "@lib/graphql/graphql";

import styles from "./ListView.module.scss";

export type PokemonSummary = ListPokemonsQuery["pokemons"]["edges"][0];

export interface PokemonCardProps {
  pokemon: PokemonSummary;
  isPriorityImage?: boolean;
}

export const PokemonCard = ({ pokemon, isPriorityImage }: PokemonCardProps) => {
  const { query } = useRouter();
  const { id, name, image, types, isFavorite } = pokemon;
  const href = {
    pathname: "/",
    query: { ...query, name: name.toLowerCase() },
  };

  return (
    <li className={styles.card}>
      <FavoriteButton
        className={styles.favorite_button}
        isFavorite={isFavorite}
        pokemonId={id}
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

      <p className="subtitle">&#35;{id}</p>
      <div className={styles.pokemon_name_container}>
        <h2 className={styles.pokemon_name}>
          <Link href={href} as={`/detail/${name.toLowerCase()}`}>
            {name}
          </Link>
        </h2>
        <span>
          {types.map((type) => (
            <PokemonType className={styles.type_icon} key={type} type={type} />
          ))}
        </span>
      </div>
    </li>
  );
};
