import { useQuery } from "@apollo/client";
import Image from "next/image";
import NextLink from "next/link";

import { graphql } from "@lib/graphql";

import { Icon, IconButton, PokemonTypeIcon } from "../shared";

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
      }
      previousEvolutions {
        id
        name
      }
      sound
      isFavorite
    }
  }
`);

export interface DetailViewProps {
  slug: string;
}

export const DetailView = ({ slug }: DetailViewProps) => {
  const { data, loading, error } = useQuery(PokemonByNameQuery, {
    variables: { name: slug },
  });

  if (loading) return <p>Loading...</p>;
  if (!data || error) return null;

  const pokemon = data.pokemonByName;
  if (!pokemon) return <p>Not found.</p>;

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
    ...[...previousEvolutions].sort(sortById),
    pokemon,
    ...[...nextEvolutions].sort(sortById),
  ];

  return (
    <div>
      <NextLink href="/"> - Back</NextLink>
      <p>&#35;{id}</p>
      <h2>{name}</h2>
      <div className={styles.image_container}>
        <Image
          className={styles.pokemon_image}
          src={image}
          alt={`${name} artwork`}
          fill
          sizes="33vw"
          priority
        />
      </div>

      <IconButton>
        <Icon
          name={isFavorite ? "favorite-filled" : "favorite"}
          label="favorite"
        />
      </IconButton>

      <div>
        <label>Height: </label>
        {height.minimum} - {height.maximum}
      </div>

      <div>
        <label>Weight: </label>
        {weight.minimum} - {weight.maximum}
      </div>

      <div>
        <label>Types: </label>
        <ul style={{ display: "inline-flex" }}>
          {types.map((type) => (
            <li key={type}>
              <PokemonTypeIcon type={type} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label>Max CP: </label>
        {maxCP}
      </div>

      <div>
        <label>Max HP: </label>
        {maxHP}
      </div>

      <div>
        <label>Evolutions: </label>
        <ul style={{ display: "inline-flex" }}>
          {evolutions.map(({ name }) => (
            <li key={name}>
              <NextLink href={`/detail/${name.toLowerCase()}`}>{name}</NextLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
