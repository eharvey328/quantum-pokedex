import { useQuery } from "@apollo/client";
import ClearIcon from "@mui/icons-material/ClearRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import { useRef, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import { graphql } from "../lib/graphql";

import { PokemonList } from "./PokemonList";

const PokemonTypesQuery = graphql(`
  query PokemonTypes {
    pokemonTypes
  }
`);

export const ListView = () => {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const action = useRef<{ focusVisible(): void }>(null);
  const debounceSearch = useDebounce(search);
  const pokemonTypes = useQuery(PokemonTypesQuery);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
          placeholder="Search for Pokemon"
          startDecorator={<SearchIcon />}
          endDecorator={
            search && (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() => setSearch("")}
              >
                <ClearIcon />
              </IconButton>
            )
          }
        />
        <Select
          placeholder="Type"
          value={type}
          action={action}
          onChange={(_, value) => setType(value)}
          {...(type && {
            // display the button and remove select indicator
            // when user has selected a value
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  // don't open the popup when clicking on this button
                  event.stopPropagation();
                }}
                onClick={() => {
                  setType(null);
                  action.current?.focusVisible();
                }}
              >
                <ClearIcon />
              </IconButton>
            ),
            indicator: null,
          })}
        >
          {pokemonTypes.data?.pokemonTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
        <Typography
          component="label"
          endDecorator={
            <Switch
              checked={onlyFavorites}
              onChange={(event) => setOnlyFavorites(event.target.checked)}
              sx={{ ml: 1 }}
            />
          }
        >
          Favorites
        </Typography>
      </div>

      <PokemonList
        search={debounceSearch}
        type={type}
        onlyFavorites={onlyFavorites}
      />
    </div>
  );
};
