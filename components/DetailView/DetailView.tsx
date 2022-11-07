import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { PokemonSummary } from "@components/ListView/PokemonCard";
import { graphql } from "@lib/graphql";

import { PokemonType, FavoriteButton } from "../shared";

import styles from "./DetailView.module.scss";

const PokemonByNameQuery = graphql(`
  query PokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      number
      name
      image
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      types
      maxCP
      maxHP
      evolutions {
        id
        name
        image
      }
      previousEvolutions {
        id
        name
        image
      }
      sound
      isFavorite
    }
  }
`);

export interface DetailViewProps {
  slug: string;
  initialData?: PokemonSummary | null;
  rewriteLink?: string;
}

export const DetailView = ({
  slug,
  initialData,
  rewriteLink,
}: DetailViewProps) => {
  const { data, loading, error } = useQuery(PokemonByNameQuery, {
    variables: { name: slug },
  });

  if (loading) return <p>Loading...</p>;

  const pokemon = data?.pokemonByName;
  if (!pokemon || error) return <p>Not found.</p>;

  const {
    id,
    name,
    image,
    height,
    weight,
    types,
    maxCP,
    maxHP,
    isFavorite,
    evolutions: nextEvolutions,
    previousEvolutions,
  } = pokemon;

  const sortById = (a: { id: string }, b: { id: string }) => +a.id - +b.id;

  const evolutions = [
    ...[...(previousEvolutions ?? [])].sort(sortById),
    pokemon,
    ...[...(nextEvolutions ?? [])].sort(sortById),
  ];

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image
            className={styles.pokemon_image}
            src={image ?? ""}
            alt={`${name} artwork`}
            fill
            priority
            sizes="400px"
          />
        </div>
        <div className={styles.header}>
          <div>
            <p className="subtitle">&#35;{id}</p>
            <h1 className="h1">{name}</h1>
          </div>
          <FavoriteButton filled={isFavorite} />
        </div>

        <div>
          <ul style={{ display: "inline-flex" }}>
            {types?.map((type: string) => (
              <li key={type} className={styles.type}>
                <PokemonType type={type} display="chip" />
              </li>
            ))}
          </ul>

          <h2 className="h2">Stats</h2>
          <div>
            <label>Height: </label>
            {height?.minimum} - {height?.maximum}
          </div>

          <div>
            <label>Weight: </label>
            {weight?.minimum} - {weight?.maximum}
          </div>

          <div>
            <label>Max CP: </label>
            {maxCP}
          </div>

          <div>
            <label>Max HP: </label>
            {maxHP}
          </div>

          <h2 className="h2">Evolutions</h2>
          <div>
            <ul className={styles.evolution_container}>
              {evolutions.map(({ name, image }) => (
                <li key={name}>
                  <Link
                    className={styles.evolution}
                    href={`${rewriteLink ?? "/detail/"}${name.toLowerCase()}`}
                    as={rewriteLink && `/detail/${name.toLowerCase()}`}
                    replace={!!rewriteLink}
                    shallow={!!rewriteLink}
                  >
                    <Image
                      className={styles.pokemon_image}
                      src={image}
                      alt={`${name} artwork`}
                      fill
                      sizes="150px"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
