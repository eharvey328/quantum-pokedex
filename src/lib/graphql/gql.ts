/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query ListPokemons($query: PokemonsQueryInput!) {\n    pokemons(query: $query) {\n      limit\n      offset\n      count\n      edges {\n        id\n        name\n        image\n      }\n    }\n  }\n": types.ListPokemonsDocument,
};

export function graphql(source: "\n  query ListPokemons($query: PokemonsQueryInput!) {\n    pokemons(query: $query) {\n      limit\n      offset\n      count\n      edges {\n        id\n        name\n        image\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListPokemons($query: PokemonsQueryInput!) {\n    pokemons(query: $query) {\n      limit\n      offset\n      count\n      edges {\n        id\n        name\n        image\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;