import { useQuery } from "@apollo/client";
import CloseRounded from "@mui/icons-material/CloseRounded";
import FilterIcon from "@mui/icons-material/TuneRounded";
import IconButton from "@mui/joy/IconButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import React from "react";

import { graphql } from "@lib/graphql";

import { PokemonTypeIcon } from "..";

import styles from "./ListView.module.scss";

const PokemonTypesQuery = graphql(`
  query PokemonTypes {
    pokemonTypes
  }
`);

export interface TypeSelectProps {
  value: string | null;
  onChange: (type: string | null) => void;
}

export const TypeSelect = ({ value, onChange }: TypeSelectProps) => {
  const { data } = useQuery(PokemonTypesQuery);
  const action = React.useRef<{ focusVisible: () => any }>(null);

  return (
    <Select
      className={styles.TypeSelect}
      placeholder="Type"
      action={action}
      variant="plain"
      size="lg"
      value={value}
      onChange={(_, value) => onChange(value ?? "")}
      startDecorator={!value && <FilterIcon />}
      sx={{ backgroundColor: "neutral.50" }}
      componentsProps={{
        listbox: {
          component: "div",
          sx: {
            maxHeight: 300,
            overflow: "auto",
            "--List-padding": "0px",
          },
        },
      }}
      {...(value && {
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
              onChange(null);
              action.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
    >
      {data?.pokemonTypes.map((type) => (
        <Option key={type} value={type}>
          <ListItemDecorator sx={{ pr: 1 }}>
            <PokemonTypeIcon type={type} />
          </ListItemDecorator>
          {type}
        </Option>
      ))}
    </Select>
  );
};
