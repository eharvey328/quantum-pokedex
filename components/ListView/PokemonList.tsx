import { NetworkStatus, useQuery } from "@apollo/client";
// import CircularProgress from "@mui/joy/CircularProgress";
import { Typography } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import { InView } from "react-intersection-observer";

import { graphql } from "@lib/graphql";
import { PokemonsQueryInput } from "@lib/graphql/graphql";

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
      <Typography sx={{ mb: 1 }} textColor="neutral.500" fontSize="sm">
        {totalPokemons} results
      </Typography>
      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => (
          <Grid xs={6} sm={3} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} isPriorityImage={index < 10} />
          </Grid>
        ))}
      </Grid>
      {loadingMore && <span>Loading...</span>}
      {hasMore ? (
        <InView
          rootMargin="200px 0px"
          onChange={(inView) => {
            if (inView) loadMore();
          }}
        />
      ) : (
        pokemons.length > PAGE_SIZE && (
          <span>You&apos;ve reached the end of the list</span>
        )
      )}
    </>
  );
};
