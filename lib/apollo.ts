import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ascendingSort, removeDuplicateObjects } from "./utils";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_POKEDEX_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
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
              return [...existing, ...incoming].filter(
                removeDuplicateObjects("__ref")
              );
            },
            read(existing, { readField }) {
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
