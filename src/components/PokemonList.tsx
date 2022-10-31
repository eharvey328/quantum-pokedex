import { useQuery } from "@apollo/client";
import { graphql } from "../lib/graphql";

const ListPokemonsQuery = graphql(`
  query ListPokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      limit
      offset
      count
      edges {
        id
        name
        image
      }
    }
  }
`);

export const PokemonList = () => {
  const { data, loading, error } = useQuery(ListPokemonsQuery, {
    variables: { query: { limit: 20 } },
  });

  if (loading) return <p>Loading...</p>;
  if (!data || error) return null;

  const pokemons = data.pokemons.edges;

  return (
    <section>
      <ol>
        {pokemons.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ol>
    </section>
  );
};
