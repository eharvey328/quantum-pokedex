import { Reference, useMutation } from "@apollo/client";
import { graphql } from "@lib/graphql";

export const UNFAVORITE_POKEMON = graphql(`
  mutation UnFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      name
      isFavorite
    }
  }
`);

/*
 *  lists are stored seperately in cache depending on the query input
 *  the id format is: pokemons:$query{...}
 *  where $query is the stringified filter and search values passed to ListPokemon query
 *  when a pokemon is unfavorited, there may be multiple cached lists that need updated
 *  it should be removed from every list where the isFavorite filter is true
 *
 *  For instance, we can have 3 lists (ids simplified):
 *  - pokmeons:(all)
 *  - pokmeons:(all favorites)
 *  - pokmeons:(grass favorites)
 *
 *  unfavoriting a pokmeon removes the item in all favorites lists
 *  but leaves the non-favorite lists alone
 *
 * NOTE:
 * pokemon lists are lists of references to pokemon
 * The individual "isFavorite" property of the pokemon is updated by the mutation without the need to manually modify cahce
 * cache needs modified so each list has the correct references only
 *
 * EDGE CASE:
 * In app, there is no way for isFavorite:false-- only ever "true" or "undefined"
 * So no need to an add item to isFavorite:false lists
 */
export const shouldRemovedFromCachedPokemonList = (cachedListId: string) => {
  // string contains check on the list id for '"isFavorite":true'
  // meaning, every list with only favorited pokemon in them
  return /"isFavorite":true/g.test(cachedListId);
};

export function useUnFavorite() {
  return useMutation(UNFAVORITE_POKEMON, {
    update(cache, { data }) {
      const response = data?.unFavoritePokemon;
      // if no response do not update cache
      if (!response) return;

      cache.modify({
        fields: {
          pokemons(existing, { storeFieldName, readField }) {
            // check each cached list and see if the pokemon should be removed from the list
            return shouldRemovedFromCachedPokemonList(storeFieldName)
              ? {
                  ...existing,
                  edges: existing.edges.filter(
                    (ref: Reference) => response.id !== readField("id", ref)
                  ),
                }
              : existing;
          },
        },
      });
    },
  });
}
