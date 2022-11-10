import { PokemonsQueryInput } from "@lib/graphql/graphql";

// returns an apollo cache id for the pokemons list
export function createMockCacheListId(query: PokemonsQueryInput) {
  const formatted = {
    $query: {
      search: query.search ?? "",
      filter: {
        type: query.filter?.type ?? "",
        ...query.filter,
      },
    },
  };
  return `pokemons:${JSON.stringify(formatted)}`;
}
