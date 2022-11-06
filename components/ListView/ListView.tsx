import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Icon, Option, Pill, Select } from "../shared";

import styles from "./ListView.module.scss";
import { PokemonList } from "./PokemonList";
import { SearchInput } from "./SearchInput";
import { TypeSelect } from "./TypeSelect";

const normalizeQueryParam = (param: string | string[] | undefined) => {
  return Array.isArray(param) ? param[0] : param;
};

const favoritesFilterItems = [
  {
    icon: <Icon name="apps" size="sm" />,
    label: "All",
    value: "all",
  },
  {
    icon: <Icon name="favorite" size="sm" />,
    label: "Favorites",
    value: "favorites",
  },
];

export const ListView = () => {
  const router = useRouter();

  const [search, setSearch] = useState(
    () => normalizeQueryParam(router.query.q) ?? ""
  );
  const [type, setType] = useState(
    () => normalizeQueryParam(router.query.type) ?? ""
  );
  const [isFavorite, setIsFavorite] = useState(
    () => !!normalizeQueryParam(router.query.favorites)
  );

  useEffect(() => {
    const query = {
      ...(search && { q: search }),
      ...(type && { type }),
      ...(isFavorite && { favorites: 1 }),
    };
    router.push({ query }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, type, isFavorite]);

  return (
    <>
      <div className={styles.search_filter}>
        <SearchInput
          className={styles.search}
          defaultValue={search}
          onChange={setSearch}
        />
        <div className={styles.filter}>
          <Pill
            name="favorites filter"
            items={favoritesFilterItems}
            onChange={(value) => setIsFavorite(value === "favorites")}
          />
          <TypeSelect value={type} onChange={setType} />
        </div>
      </div>
      <PokemonList search={search} type={type} isFavorite={isFavorite} />
    </>
  );
};
