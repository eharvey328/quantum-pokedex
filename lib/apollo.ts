import { ApolloClient, InMemoryCache } from "@apollo/client";

import { ascendingSort, removeDuplicateObjects } from "./utils";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_POKEDEX_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            // make distinct (cached) lists per search and filter value
            keyArgs: ["$query", ["search", "filter"]],
            merge: true,
          },
        },
      },
      PokemonConnection: {
        fields: {
          edges: {
            keyArgs: false,
            merge(existing = [], incoming) {
              // merge lists for infinite scroll pagination
              return [...existing, ...incoming].filter(
                removeDuplicateObjects("__ref")
              );
            },
            read(existing, { readField }) {
              // always get list sorted by id
              return [...existing].sort((a, b) =>
                ascendingSort(a, b, (ref) => readField("id", ref))
              );
            },
          },
        },
      },
    },
  }),
});
