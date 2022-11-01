import { useQuery } from "@apollo/client";

import { graphql } from "../lib/graphql";

const PokemonByNameQuery = graphql(`
  query PokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      number
      name
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

  return (
    <section>
      <h2>{pokemon?.name}</h2>
    </section>
  );
};
