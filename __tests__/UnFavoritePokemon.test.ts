import { shouldRemovedFromCachedPokemonList } from "../lib/mutations";

import { createMockCacheListId } from "./helpers/createMockCacheListId";

describe("UnFavoritePokemon", () => {
  describe("shouldRemovedFromCachedPokemonList", () => {
    it("return false if no search/filter", () => {
      const cacheId = createMockCacheListId({});
      const flag = shouldRemovedFromCachedPokemonList(cacheId);
      expect(flag).toBeFalsy();
    });
    it("return true if isFavorite filter is true", () => {
      const cacheId = createMockCacheListId({ filter: { isFavorite: true } });
      const flag = shouldRemovedFromCachedPokemonList(cacheId);
      expect(flag).toBeTruthy();
    });

    it("return false for other search/filters without isFavorite set to true", () => {
      const cacheId = createMockCacheListId({
        search: "test",
        filter: { type: "Grass" },
      });
      const flag = shouldRemovedFromCachedPokemonList(cacheId);
      expect(flag).toBeFalsy();
    });

    it("return true for other search/filters with isFavorite set to true", () => {
      const cacheId = createMockCacheListId({
        search: "test",
        filter: { type: "Grass", isFavorite: true },
      });
      const flag = shouldRemovedFromCachedPokemonList(cacheId);
      expect(flag).toBeTruthy();
    });
  });
});
