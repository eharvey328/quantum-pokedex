import { NetworkStatus, useQuery } from "@apollo/client";
import UnfavoriteIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CircularProgress from "@mui/joy/CircularProgress";
import Grid from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { default as NextLink } from "next/link";

import { graphql } from "../lib/graphql";
import { PokemonsQueryInput } from "../lib/graphql/graphql";

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
        isFavorite
      }
    }
  }
`);

// const FavoriteMutation = graphql(`
//   mutation FavoritePokemon($id: ID!) {
//     favoritePokemon(id: $id) {
//       id
//       name
//       isFavorite
//     }
//   }
// `);

// const UnFavoriteMutation = graphql(`
//   mutation UnFavoritePokemon($id: ID!) {
//     unFavoritePokemon(id: $id) {
//       id
//       name
//       isFavorite
//     }
//   }
// `);

const baseQuery: PokemonsQueryInput = {
  limit: 20,
  offset: 0,
};

export interface PokemonListProps {
  search: string;
  type: string | null;
  onlyFavorites: boolean;
}

export const PokemonList = ({
  search,
  type,
  onlyFavorites,
}: PokemonListProps) => {
  const query: PokemonsQueryInput = {
    ...baseQuery,
    search,
    filter: {
      type,
      ...(onlyFavorites && { isFavorite: onlyFavorites }),
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

  if (loading && !loadingMore) return <CircularProgress />;
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

  const areMore = pokemons.length < totalPokemons;

  return (
    <>
      <Grid container spacing={2}>
        {pokemons.map(({ id, name, image, isFavorite }) => (
          <Grid xs={6} sm={4} md={3} lg={2} key={id}>
            <Card>
              <Typography level="h2" fontSize="md" sx={{ mb: 1 }}>
                <Link
                  overlay
                  underline="none"
                  href={`/detail/${name.toLowerCase()}`}
                  component={NextLink}
                >
                  {name}
                </Link>
              </Typography>
              <Sheet
                color="danger"
                sx={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  pointerEvents: "none",
                }}
              >
                {isFavorite ? <FavoriteIcon /> : <UnfavoriteIcon />}
              </Sheet>
              <div
                style={{
                  position: "relative",
                  aspectRatio: 1 / 1,
                  pointerEvents: "none",
                }}
              >
                <Image
                  src={image}
                  alt={`${name} artwork`}
                  fill
                  sizes="33vw"
                  style={{
                    background: "#FFF",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      {areMore && (
        <Button onClick={() => loadMore()} disabled={loadingMore}>
          {loadingMore ? "Loading..." : "Show More"}
        </Button>
      )}
    </>
  );
};
