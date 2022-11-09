import { ApolloClient, InMemoryCache, Reference } from "@apollo/client";

const removeDuplicateObjects = (value: any, index: number, self: any) => {
  return (
    index === self.findIndex((selfItem: any) => value.__ref === selfItem.__ref)
  );
};

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
              return [...existing, ...incoming].filter(removeDuplicateObjects);
            },
            read(existing, { readField }) {
              return [...existing].sort((a: Reference, b: Reference) => {
                const id1 = readField("id", a);
                const id2 = readField("id", b);
                if (!id1) return 1;
                if (!id2) return -1;
                return +id1 - +id2;
              });
            },
          },
        },
      },
    },
  }),
});
