import { graphql } from "@lib/graphql";

export const LIST_POKEMONS = graphql(`
  query ListPokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      limit
      offset
      count
      edges {
        id
        name
        image
        types
        isFavorite
      }
    }
  }
`);
