import { useQuery } from "@apollo/client";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import React from "react";

import { graphql } from "@lib/graphql";

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
    <Select value={value} onChange={(_, value) => onChange(value ?? "")}>
      <Option value="">All Types</Option>
      {data?.pokemonTypes.map((type) => (
        <Option key={type} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  );
};
