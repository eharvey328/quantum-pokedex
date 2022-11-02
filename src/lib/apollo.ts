import { ApolloClient, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

import { QueryPokemonsArgs } from "./graphql/graphql";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_POKEDEX_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: (args) => {
              const { limit, offset, ...filters } = (args as QueryPokemonsArgs)
                .query;
              return JSON.stringify(filters);
            },
            merge: true,
          },
        },
      },
      PokemonConnection: {
        fields: {
          edges: concatPagination(),
        },
      },
    },
  }),
});
