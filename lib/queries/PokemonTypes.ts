import { graphql } from "@lib/graphql";

export const POKEMON_TYPES = graphql(`
  query PokemonTypes {
    pokemonTypes
  }
`);
