import { ModalUnstyled } from "@mui/base";
import { useQueryState } from "next-usequerystate";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { DetailView } from "@components/DetailView";
import { Icon, Option, Pill, Select, Modal } from "@components/shared";

import styles from "./ListView.module.scss";
import { PokemonSummary } from "./PokemonCard";
import { PokemonList } from "./PokemonList";
import { SearchInput } from "./SearchInput";
import { TypeSelect } from "./TypeSelect";

const favoritesFilterItems = [
  {
    icon: <Icon name="apps" size="sm" />,
    label: "All",
    value: 0,
  },
  {
    icon: <Icon name="favorite" size="sm" />,
    label: "Favorites",
    value: 1,
  },
];

export interface ListViewProps {
  search: string;
  type: string;
  favorite: number;
}

export const ListView = ({ search, type, favorite }: ListViewProps) => {
  const router = useRouter();

  const updateUrl = (newValue: any) => {
    const merged = { ...router.query, ...newValue };
    const query = Object.keys(merged).reduce((acc, key) => {
      if (merged[key]) {
        acc = { ...acc, [key]: merged[key] };
      }
      return acc;
    }, {});
    router.push({ query }, undefined, { shallow: true });
  };

  return (
    <>
      {router.query.name && (
        <Modal open onClose={() => router.push("/")}>
          <div className={styles.modal}>
            <DetailView
              slug={(router.query.name as string) ?? ""}
              rewriteLink="/?name="
            />
          </div>
        </Modal>
      )}

      <div className={styles.search_filter}>
        <SearchInput
          className={styles.search}
          defaultValue={search}
          onChange={(value) => updateUrl({ q: value })}
        />
        <div className={styles.filter}>
          <Pill
            value={favorite}
            name="favorites filter"
            items={favoritesFilterItems}
            onChange={(value) => updateUrl({ favorite: value })}
          />
          <TypeSelect
            value={(type as string) ?? ""}
            onChange={(value) => updateUrl({ type: value })}
          />
        </div>
      </div>
      <PokemonList search={search} type={type} isFavorite={!!favorite} />
    </>
  );
};
