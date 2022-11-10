import { ParsedUrlQuery } from "querystring";

import { useQuery } from "@apollo/client";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import { PokemonType, FavoriteButton, Range } from "@components/shared";

import styles from "./DetailView.module.scss";
import { Evolutions } from "./Evolutions";
import { POKEMON_BY_NAME } from "@lib/queries";
import { SoundButton } from "./SoundButton";

// rewrite link used to change the anchor tag behavior
// an href will use the rewrite link as its path instead of its default
// if rewriteLink is present, the "as" prop is used to change the url visually,
// but will keep the route as the "as" url.
// Useful for modal behavior to "embed" the page

export interface DetailViewProps {
  slug: string;
  rewriteLink?: string;
  queryParams?: ParsedUrlQuery;
}

export const DetailView = ({
  slug,
  rewriteLink,
  queryParams,
}: DetailViewProps) => {
  const { data, loading, error } = useQuery(POKEMON_BY_NAME, {
    variables: { name: slug },
  });

  const standalonePage = !queryParams?.name;

  if (loading) {
    return (
      <p className={clsx(styles.container, styles.container_empty)}>
        Loading...
      </p>
    );
  }

  const pokemon = data?.pokemonByName;
  if (!pokemon || error) {
    return (
      <p className={clsx(styles.container, styles.container_empty)}>
        Pokémon not found.
      </p>
    );
  }

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
    sound,
  } = pokemon;

  return (
    <>
      <Head>
        <title>Pokédex Details | {name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image
            className={styles.pokemon_image}
            src={image ?? ""}
            alt={`${name} artwork`}
            fill
            priority={standalonePage}
            sizes="400px"
          />
        </div>

        <div className={styles.header}>
          <div>
            <p className="subtitle">&#35;{id}</p>
            <h1 className="h1">{name}</h1>
          </div>
          <span>
            <SoundButton src={sound} />
            <FavoriteButton isFavorite={isFavorite} pokemonId={id} />
          </span>
        </div>

        <div>
          <ul className={styles.types}>
            {types?.map((type: string) => (
              <li key={type} className={styles.type}>
                <PokemonType type={type} display="chip" />
              </li>
            ))}
          </ul>

          <h2 className={clsx(styles.subheader, "h2")}>Statistics</h2>
          <div className={styles.stat}>
            <label>Height</label>
            <span className={styles.stat_item}>
              <span> {height.minimum}</span>
              <span>-</span>
              <span> {height.maximum}</span>
            </span>
          </div>

          <div className={styles.stat}>
            <label>Weight</label>
            <span className={styles.stat_item}>
              <span>{weight.minimum}</span>
              <span>-</span>
              <span>{weight.maximum}</span>
            </span>
          </div>

          <div className={styles.stat}>
            <Range label="Max CP" value={+maxCP} min={200} max={3900} />
          </div>
          <div className={styles.stat}>
            <Range label="Max HP" value={+maxHP} min={200} max={3900} />
          </div>

          <h2 className={clsx(styles.subheader, "h2")}>Evolutions</h2>
          <Evolutions
            pokemon={pokemon}
            rewriteLink={rewriteLink}
            queryParams={queryParams}
          />
        </div>
      </div>
    </>
  );
};
