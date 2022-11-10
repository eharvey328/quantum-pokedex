import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useState } from "react";

import { Snackbar } from "@components/shared";
import { LIST_POKEMONS } from "@lib/queries";

import { InfiniteScroll } from "./InfiniteScroll";
import styles from "./ListView.module.scss";
import { PokemonCard } from "./PokemonCard";

// number of pokemon per page
export const PAGE_SIZE = 20;
// averge number of pokemon viewable on page load
const AVG_ITEMS_IN_VIEW = 8;

export interface PokemonListProps {
  search: string;
  type: string;
  isFavorite: boolean;
}

export const PokemonList = ({ search, type, isFavorite }: PokemonListProps) => {
  const [fetchMoreError, setFetchMoreError] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const query = {
    limit: PAGE_SIZE,
    search,
    filter: {
      type,
      ...(isFavorite && { isFavorite }), // only adds isFavorite filter if it is true
    },
  };

  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    LIST_POKEMONS,
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
            onError={setErrorMessage}
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
      <Snackbar open={!!errorMessage} onClose={() => setErrorMessage(null)}>
        {errorMessage}
      </Snackbar>
    </>
  );
};
