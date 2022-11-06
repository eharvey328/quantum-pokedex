import { useQuery } from "@apollo/client";
// import CloseRounded from "@mui/icons-material/CloseRounded";
// import FilterIcon from "@mui/icons-material/TuneRounded";
// import IconButton from "@mui/joy/IconButton";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
import React from "react";

import { graphql } from "@lib/graphql";

import { PokemonTypeIcon } from "..";
import { Select, Option } from "../shared";

const PokemonTypesQuery = graphql(`
  query PokemonTypes {
    pokemonTypes
  }
`);

export interface TypeSelectProps {
  value: string;
  onChange: (type: string) => void;
}

export const TypeSelect = ({ value, onChange }: TypeSelectProps) => {
  const { data } = useQuery(PokemonTypesQuery);

  return (
    <Select
      placeholder="Type"
      value={value}
      onChange={(_, newValue) => {
        console.log(newValue);
        onChange(newValue ?? "");
      }}
    >
      <Option value="">Types</Option>
      {data?.pokemonTypes.map((type) => (
        <Option key={type} value={type}>
          {/* <ListItemDecorator sx={{ pr: 1 }}> */}
          {/* <PokemonTypeIcon type={type} /> */}
          {/* </ListItemDecorator> */}
          {type}
        </Option>
      ))}
    </Select>
  );
};
