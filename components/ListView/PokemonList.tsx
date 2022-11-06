import { NetworkStatus, useQuery } from "@apollo/client";

import { graphql } from "@lib/graphql";
import { PokemonsQueryInput } from "@lib/graphql/graphql";

import { InfiniteScroll } from "./InfiniteScroll";
import styles from "./ListView.module.scss";
import { PokemonCard } from "./PokemonCard";

const ListPokemonsQuery = graphql(`
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

const PAGE_SIZE = 20;

export interface PokemonListProps {
  search: string;
  type: string | null;
  isFavorite: boolean;
}

export const PokemonList = ({ search, type, isFavorite }: PokemonListProps) => {
  const query: PokemonsQueryInput = {
    limit: PAGE_SIZE,
    search,
    filter: {
      ...(type && { type }),
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

  // if (loading && !loadingMore) return <CircularProgress />;
  if (!data || error) return null;

  const { edges: pokemons, count: totalPokemons } = data.pokemons;

  const loadMore = () => {
    fetchMore({
      variables: {
        query: {
          ...query,
          offset: pokemons.length,
        },
      },
    });
  };

  const hasMore = pokemons.length < totalPokemons;

  return (
    <>
      <p className={styles.count_message}>Found {totalPokemons} results</p>
      <ol className={styles.pokemon_grid}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={`${pokemon.id}${index}`}
            pokemon={pokemon}
            isPriorityImage={index < 8}
          />
        ))}
      </ol>
      <InfiniteScroll
        loadMore={loadMore}
        loading={loadingMore}
        hasMore={hasMore}
        showEndMessage={pokemons.length > PAGE_SIZE}
      />
    </>
  );
};
