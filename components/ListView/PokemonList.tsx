import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useState } from "react";

import { graphql } from "@lib/graphql";
import { PokemonsQueryInput } from "@lib/graphql/graphql";

import { InfiniteScroll } from "./InfiniteScroll";
import styles from "./ListView.module.scss";
import { PokemonCard } from "./PokemonCard";

export const ListPokemonsQuery = graphql(`
  query ListPokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      limit
      offset
      count
      edges {
        id
        name
        image
        types
        isFavorite
      }
    }
  }
`);

export const PAGE_SIZE = 20;
const AVG_ITEMS_IN_VIEW = 8;

export interface PokemonListProps {
  search: string;
  type: string;
  isFavorite: boolean;
}

export const PokemonList = ({ search, type, isFavorite }: PokemonListProps) => {
  const [fetchMoreError, setFetchMoreError] = useState(null);
  const query: PokemonsQueryInput = {
    limit: PAGE_SIZE,
    search,
    filter: {
      type,
      ...(isFavorite && { isFavorite }),
    },
  };

  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    ListPokemonsQuery,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
      variables: { query },
    }
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  if (loading && !loadingMore) {
    return <p className={styles.empty_container}>Loading...</p>;
  }

  if (error) {
    return (
      <p className={styles.empty_container}>Unable to retrieve results.</p>
    );
  }

  if (!data?.pokemons?.edges.length) {
    return <p className={styles.empty_container}>No Pokémon Found.</p>;
  }

  const { edges: pokemons, count: totalPokemons } = data.pokemons;

  const loadMore = () => {
    fetchMore({
      variables: {
        query: {
          ...query,
          offset: pokemons.length,
        },
      },
    }).catch((err) => setFetchMoreError(err));
  };

  const hasMore = pokemons.length < totalPokemons;

  return (
    <>
      <p className={styles.count_message}>Found {totalPokemons} results</p>
      <ol className={styles.pokemon_grid}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={pokemon.id + index}
            pokemon={pokemon}
            isPriorityImage={index < AVG_ITEMS_IN_VIEW}
          />
        ))}
      </ol>
      <InfiniteScroll
        loadMore={loadMore}
        loading={loadingMore}
        hasMore={hasMore}
        disable={error || pokemons.length < PAGE_SIZE}
        error={fetchMoreError}
      />
    </>
  );
};
