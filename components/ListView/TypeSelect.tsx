import { useQuery } from "@apollo/client";
import React from "react";

import { graphql } from "@lib/graphql";

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
      onChange={(_, newValue) => onChange(newValue ?? "")}
    >
      <Option value="">Types</Option>
      {data?.pokemonTypes.map((type) => (
        <Option key={type} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  );
};
