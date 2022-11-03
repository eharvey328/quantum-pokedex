import { ApolloClient, InMemoryCache } from "@apollo/client";

import { QueryPokemonsArgs } from "@lib/graphql/graphql";

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
          edges: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
