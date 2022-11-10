import { shouldAddToCachedPokemonList } from "../lib/mutations";
import { createMockCacheListId } from "./helpers/createMockCacheListId";

describe("FavoritePokemon", () => {
  describe("shouldRemovedFromCachedPokemonList", () => {
    const mockFavPokemon = {
      name: "Bulbasaur",
      types: ["Grass", "Poison"],
    };

    it("return false if no search/filter", () => {
      const cacheId = createMockCacheListId({});
      const flag = shouldAddToCachedPokemonList(cacheId, mockFavPokemon);
      expect(flag).toBeFalsy();
    });

    it("return true if isFavorite filter is true", () => {
      const cacheId = createMockCacheListId({ filter: { isFavorite: true } });
      const flag = shouldAddToCachedPokemonList(cacheId, mockFavPokemon);
      expect(flag).toBeTruthy();
    });

    it("return true if isFavorite and filters filter match", () => {
      const cacheId = createMockCacheListId({
        filter: { type: "Grass", isFavorite: true },
      });
      const flag = shouldAddToCachedPokemonList(cacheId, mockFavPokemon);
      expect(flag).toBeTruthy();
    });

    it("return true if isFavorite and search matches", () => {
      const cacheId = createMockCacheListId({
        search: "bul",
        filter: { isFavorite: true },
      });
      const flag = shouldAddToCachedPokemonList(cacheId, mockFavPokemon);
      expect(flag).toBeTruthy();
    });

    it("return false if search and filter match but not isFavorite", () => {
      const cacheId = createMockCacheListId({
        search: "bul",
        filter: { type: "Grass" },
      });
      const flag = shouldAddToCachedPokemonList(cacheId, mockFavPokemon);
      expect(flag).toBeFalsy();
    });
  });
});
