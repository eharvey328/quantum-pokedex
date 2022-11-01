import { useQuery } from "@apollo/client";
import Card from "@mui/joy/Card";
import Grid from "@mui/joy/Grid";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { default as NextLink } from "next/link";

import { graphql } from "../lib/graphql";

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
      }
    }
  }
`);

export const ListView = () => {
  const { data, loading, error } = useQuery(ListPokemonsQuery, {
    variables: { query: { limit: 20 } },
  });

  if (loading) return <p>Loading...</p>;
  if (!data || error) return null;

  const pokemons = data.pokemons.edges;

  return (
    <section>
      <Grid container spacing={2}>
        {pokemons.map(({ id, name, image }) => (
          <Grid key={id} sm={4} xs={6}>
            <Card>
              <Typography level="h2" fontSize="md">
                <Link
                  overlay
                  underline="none"
                  href={`/detail/${name.toLowerCase()}`}
                  component={NextLink}
                >
                  {name}
                </Link>
              </Typography>
              <div style={{ position: "relative", aspectRatio: 1 / 1 }}>
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
    </section>
  );
};
