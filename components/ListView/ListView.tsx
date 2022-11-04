import { Grid } from "@mui/joy";
import RadioGroup from "@mui/joy/RadioGroup";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { PokemonList } from "./PokemonList";
import { SearchInput } from "./SearchInput";
import { TypeSelect } from "./TypeSelect";

const normalizeQueryParam = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};

export interface ListViewProps {
  isFavorite?: boolean;
}

export const ListView = ({ isFavorite = false }: ListViewProps) => {
  const router = useRouter();

  const [search, setSearch] = useState(
    () => normalizeQueryParam(router.query.q) ?? ""
  );
  const [type, setType] = useState(
    () => normalizeQueryParam(router.query.type) ?? null
  );

  useEffect(() => {
    const query = {
      ...(search && { q: search }),
      ...(type && { type }),
    };
    router.push({ query }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, type]);

  return (
    <>
      <Grid spacing={2} container style={{ marginBottom: "1rem" }}>
        <Grid xs={6}>
          <SearchInput defaultValue={search} onChange={setSearch} />
        </Grid>
        <Grid>
          <TypeSelect value={type} onChange={setType} />
        </Grid>
      </Grid>
      {/* <Tabs>
        <TabList variant="soft" color="neutral">
          <Tab>...</Tab>
        </TabList>
      </Tabs> */}
      {/* <Typography
          component="label"
          endDecorator={
            <Switch
              checked={isFavorite}
              onChange={(event) => setIsFavorite(event.target.checked)}
              sx={{ ml: 1 }}
            />
          }
        >
          Favorites
        </Typography> */}

      <PokemonList search={search} type={type} isFavorite={isFavorite} />
    </>
  );
};
