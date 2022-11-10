import { useMutation } from "@apollo/client";
import { graphql } from "@lib/graphql";

export const FAVORITE_POKEMON = graphql(`
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
      name
      types
      image
      isFavorite
    }
  }
`);

/*
 *  lists are stored seperately in cache depending on the query input
 *  the id format is: pokemons:$query{...}
 *  where $query is the stringified filter and search values passed to ListPokemon query
 *  when a pokemon is favorited, there may be multiple cached lists that need updated
 *  it should be added to the list if the isFavorite filter is true and if pokmeon matches the type and search filter
 *
 *  For instance, we can have 3 lists (ids simplified):
 *    - pokemon:(all)
 *    - pokemon:(all favorites)
 *    - pokemon:(grass favorites)
 *
 *  if a grass pokemon from the "pokemon(all)" list is favorited
 *  we need it to both the "pokemon:(all favorites)" and "pokemon:(grass favorites)" lists
 *
 *  NOTE:
 *  pokemon lists are lists of references to pokemon
 *  The individual "isFavorite" property of the pokemon is updated by the mutation without the need to manually modify cahce
 *  cache needs modified so each list has the correct references only
 *
 * EDGE CASE:
 * In app, there is no way for isFavorite:false-- only ever "true" or "undefined"
 * So no need to remove an item from isFavorite:false lists
 */
export const shouldAddToCachedPokemonList = <
  T extends { types: string[]; name: string }
>(
  cachedListId: string,
  response: T
) => {
  // retrieve the $query arg used to id the list
  const listId = JSON.parse(cachedListId.split(/pokemons:/g)[1]);
  const { search, filter } = listId.$query;

  // if the list does not have a type set (all types)
  // or the favorite pokemon is a part of the list type
  // it is a matching type
  const isMatchingType =
    !filter?.type ||
    filter.type === "" ||
    response.types.includes(filter?.type);

  // if the list does not have a search specified
  // or the favorite pokemon name includes the search value
  // it is a matching type
  const isMatchingSearch =
    !search || search === "" || new RegExp(search, "i").test(response.name);

  // must pass each filter check
  return filter.isFavorite && isMatchingType && isMatchingSearch;
};

export function useFavorite() {
  return useMutation(FAVORITE_POKEMON, {
    update(cache, { data }) {
      const response = data?.favoritePokemon;
      // if no response do not update cache
      if (!response) return;

      cache.modify({
        fields: {
          pokemons(existing, { storeFieldName }) {
            // check each cached list and see if the pokemon should be added to the list
            return shouldAddToCachedPokemonList(storeFieldName, response)
              ? { ...existing, edges: [...(existing.edges ?? []), response] }
              : existing;
          },
        },
      });
    },
  });
}
