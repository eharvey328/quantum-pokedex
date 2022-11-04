import FavoriteIcon from "@mui/icons-material/FavoriteRounded";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import { default as NextLink } from "next/link";

import { ListPokemonsQuery } from "@lib/graphql/graphql";

import { PokemonTypeIcon } from "..";

export interface PokemonCardProps {
  pokemon: ListPokemonsQuery["pokemons"]["edges"][0];
  isPriorityImage?: boolean;
}

export const PokemonCard = ({ pokemon, isPriorityImage }: PokemonCardProps) => {
  const { id, name, image, types, isFavorite } = pokemon;
  return (
    <Card
      variant="plain"
      sx={{
        "--Card-padding": "1.5rem",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "md",
        },
      }}
    >
      <Sheet
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          pointerEvents: "none",
          color: isFavorite ? "#d94256" : "#e0e0e0",
          zIndex: 1,
        }}
      >
        <FavoriteIcon />
      </Sheet>
      <div
        style={{
          position: "relative",
          aspectRatio: 1 / 1,
          pointerEvents: "none",
          margin: "1rem",
        }}
      >
        <Image
          src={image}
          alt={`${name} artwork`}
          fill
          sizes="20vw"
          priority={isPriorityImage}
          style={{
            background: "#FFF",
            objectFit: "contain",
          }}
        />
      </div>
      <div>
        <Typography
          fontSize="md"
          sx={{ fontWeight: 700, color: "text.tertiary", opacity: 0.7 }}
        >
          &#35;{id}
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography level="h2" fontSize="md" sx={{ mr: 1 }}>
            <Link
              overlay
              underline="none"
              href={`/detail/${name.toLowerCase()}`}
              component={NextLink}
              sx={{ color: "text.primary", fontSize: "1.2rem" }}
            >
              {name}
            </Link>
          </Typography>
          {types.map((type) => (
            <span key={type} style={{ marginRight: ".2rem" }}>
              <PokemonTypeIcon type={type} />
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};
