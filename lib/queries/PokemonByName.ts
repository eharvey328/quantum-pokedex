import { graphql } from "@lib/graphql";

export const POKEMON_BY_NAME = graphql(`
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
