import { useQuery } from "@apollo/client";
import React from "react";

import { graphql } from "@lib/graphql";

import { Select, Option } from "@components/shared";

export const PokemonTypesQuery = graphql(`
  query PokemonTypes {
    pokemonTypes
  }
`);

export interface TypeSelectProps {
  value: string;
  onChange: (type: string) => void;
}

export const TypeSelect = ({ value, onChange }: TypeSelectProps) => {
  const { data, loading, error } = useQuery(PokemonTypesQuery);

  return (
    <Select
      placeholder="Type"
      value={value}
      onChange={(_, newValue) => onChange(newValue ?? "")}
      disabled={!!error}
    >
      <Option value="">Type</Option>
      {loading && <Option value="_loading">Loading...</Option>}
      {data?.pokemonTypes.map((type) => (
        <Option key={type} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  );
};
