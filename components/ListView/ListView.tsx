import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { useState } from "react";

import { PokemonList } from "./PokemonList";
import { SearchInput } from "./SearchInput";
import { TypeSelect } from "./TypeSelect";

const normalizeQueryParam = (param: string | string[] | undefined) => {
  if (!param) return "";
  return Array.isArray(param) ? param[0] : param;
};

export const ListView = () => {
  const router = useRouter();
  const [search, setSearch] = useState(() =>
    normalizeQueryParam(router.query.q)
  );
  const [type, setType] = useState(() =>
    normalizeQueryParam(router.query.type)
  );
  const [isFavorite, setIsFavorite] = useState(
    () => !!normalizeQueryParam(router.query.favorites)
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <SearchInput defaultValue={search} onChange={setSearch} />
        <TypeSelect value={type} onChange={setType} />
        <Typography
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
        </Typography>
      </div>
      <PokemonList search={search} type={type} isFavorite={isFavorite} />
    </>
  );
};
