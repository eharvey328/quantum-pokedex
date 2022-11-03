/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** The favorite pokemon feature is based on the user's ip address */
  favoritePokemon?: Maybe<Pokemon>;
  /** The favorite pokemon feature is based on the user's ip address */
  unFavoritePokemon?: Maybe<Pokemon>;
};


export type MutationFavoritePokemonArgs = {
  id: Scalars['ID'];
};


export type MutationUnFavoritePokemonArgs = {
  id: Scalars['ID'];
};

export type Pokemon = {
  __typename?: 'Pokemon';
  evolutions: Array<Pokemon>;
  height: PokemonDimension;
  id: Scalars['ID'];
  image: Scalars['String'];
  /** The favorite pokemon feature is based on the user's ip address */
  isFavorite: Scalars['Boolean'];
  maxCP: Scalars['Int'];
  maxHP: Scalars['Int'];
  name: Scalars['String'];
  number: Scalars['Int'];
  previousEvolutions: Array<Pokemon>;
  sound: Scalars['String'];
  types: Array<Scalars['String']>;
  weight: PokemonDimension;
};

export type PokemonConnection = {
  __typename?: 'PokemonConnection';
  count: Scalars['Int'];
  edges: Array<Pokemon>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type PokemonDimension = {
  __typename?: 'PokemonDimension';
  maximum: Scalars['String'];
  minimum: Scalars['String'];
};

export type PokemonFilterInput = {
  isFavorite?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PokemonsQueryInput = {
  filter?: InputMaybe<PokemonFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  pokemonById?: Maybe<Pokemon>;
  pokemonByName?: Maybe<Pokemon>;
  pokemonTypes: Array<Scalars['String']>;
  pokemons: PokemonConnection;
};


export type QueryPokemonByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPokemonByNameArgs = {
  name: Scalars['String'];
};


export type QueryPokemonsArgs = {
  query: PokemonsQueryInput;
};

export type Root = {
  __typename?: 'Root';
  query: Query;
};

export type PokemonByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type PokemonByNameQuery = { __typename?: 'Query', pokemonByName?: { __typename?: 'Pokemon', id: string, number: number, name: string, types: Array<string>, maxCP: number, maxHP: number, sound: string, isFavorite: boolean, weight: { __typename?: 'PokemonDimension', minimum: string, maximum: string }, height: { __typename?: 'PokemonDimension', minimum: string, maximum: string }, evolutions: Array<{ __typename?: 'Pokemon', id: string, name: string }>, previousEvolutions: Array<{ __typename?: 'Pokemon', id: string, name: string }> } | null };

export type ListPokemonsQueryVariables = Exact<{
  query: PokemonsQueryInput;
}>;


export type ListPokemonsQuery = { __typename?: 'Query', pokemons: { __typename?: 'PokemonConnection', limit: number, offset: number, count: number, edges: Array<{ __typename?: 'Pokemon', id: string, name: string, image: string, isFavorite: boolean }> } };

export type PokemonTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type PokemonTypesQuery = { __typename?: 'Query', pokemonTypes: Array<string> };


export const PokemonByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PokemonByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pokemonByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minimum"}},{"kind":"Field","name":{"kind":"Name","value":"maximum"}}]}},{"kind":"Field","name":{"kind":"Name","value":"height"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minimum"}},{"kind":"Field","name":{"kind":"Name","value":"maximum"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"maxCP"}},{"kind":"Field","name":{"kind":"Name","value":"maxHP"}},{"kind":"Field","name":{"kind":"Name","value":"evolutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"previousEvolutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sound"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]} as unknown as DocumentNode<PokemonByNameQuery, PokemonByNameQueryVariables>;
export const ListPokemonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPokemons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PokemonsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pokemons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"isFavorite"}}]}}]}}]}}]} as unknown as DocumentNode<ListPokemonsQuery, ListPokemonsQueryVariables>;
export const PokemonTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PokemonTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pokemonTypes"}}]}}]} as unknown as DocumentNode<PokemonTypesQuery, PokemonTypesQueryVariables>;