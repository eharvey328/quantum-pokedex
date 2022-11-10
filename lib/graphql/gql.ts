/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation FavoritePokemon($id: ID!) {\n    favoritePokemon(id: $id) {\n      id\n      name\n      types\n      image\n      isFavorite\n    }\n  }\n": types.FavoritePokemonDocument,
    "\n  mutation UnFavoritePokemon($id: ID!) {\n    unFavoritePokemon(id: $id) {\n      id\n      name\n      isFavorite\n    }\n  }\n": types.UnFavoritePokemonDocument,
    "\n  query ListPokemons($query: PokemonsQueryInput!) {\n    pokemons(query: $query) {\n      limit\n      offset\n      count\n      edges {\n        id\n        name\n        image\n        types\n        isFavorite\n      }\n    }\n  }\n": types.ListPokemonsDocument,
    "\n  query PokemonByName($name: String!) {\n    pokemonByName(name: $name) {\n      id\n      number\n      name\n      image\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      types\n      maxCP\n      maxHP\n      evolutions {\n        id\n        name\n        image\n      }\n      previousEvolutions {\n        id\n        name\n        image\n      }\n      sound\n      isFavorite\n    }\n  }\n": types.PokemonByNameDocument,
    "\n  query PokemonTypes {\n    pokemonTypes\n  }\n": types.PokemonTypesDocument,
};

export function graphql(source: "\n  mutation FavoritePokemon($id: ID!) {\n    favoritePokemon(id: $id) {\n      id\n      name\n      types\n      image\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  mutation FavoritePokemon($id: ID!) {\n    favoritePokemon(id: $id) {\n      id\n      name\n      types\n      image\n      isFavorite\n    }\n  }\n"];
export function graphql(source: "\n  mutation UnFavoritePokemon($id: ID!) {\n    unFavoritePokemon(id: $id) {\n      id\n      name\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  mutation UnFavoritePokemon($id: ID!) {\n    unFavoritePokemon(id: $id) {\n      id\n      name\n      isFavorite\n    }\n  }\n"];
export function graphql(source: "\n  query ListPokemons($query: PokemonsQueryInput!) {\n    pokemons(query: $query) {\n      limit\n      offset\n      count\n      edges {\n        id\n        name\n        image\n        types\n        isFavorite\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPokemons($query: PokemonsQueryInput!) {\n    pokemons(query: $query) {\n      limit\n      offset\n      count\n      edges {\n        id\n        name\n        image\n        types\n        isFavorite\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query PokemonByName($name: String!) {\n    pokemonByName(name: $name) {\n      id\n      number\n      name\n      image\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      types\n      maxCP\n      maxHP\n      evolutions {\n        id\n        name\n        image\n      }\n      previousEvolutions {\n        id\n        name\n        image\n      }\n      sound\n      isFavorite\n    }\n  }\n"): (typeof documents)["\n  query PokemonByName($name: String!) {\n    pokemonByName(name: $name) {\n      id\n      number\n      name\n      image\n      weight {\n        minimum\n        maximum\n      }\n      height {\n        minimum\n        maximum\n      }\n      types\n      maxCP\n      maxHP\n      evolutions {\n        id\n        name\n        image\n      }\n      previousEvolutions {\n        id\n        name\n        image\n      }\n      sound\n      isFavorite\n    }\n  }\n"];
export function graphql(source: "\n  query PokemonTypes {\n    pokemonTypes\n  }\n"): (typeof documents)["\n  query PokemonTypes {\n    pokemonTypes\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;