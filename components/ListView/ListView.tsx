import { useRouter } from "next/router";

import { DetailView } from "@components/DetailView";
import { Icon, Pill, Modal } from "@components/shared";
import { removeFalsyObjects, normalizeQueryParam } from "@lib/utils";

import styles from "./ListView.module.scss";
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

  const selectedName = normalizeQueryParam(router.query.name);

  const updateUrl = (newValue: any) => {
    const merged = { ...router.query, ...newValue };
    const query = removeFalsyObjects(merged);
    router.push({ query }, undefined, { shallow: true });
  };

  return (
    <>
      {selectedName && (
        <Modal open onClose={() => router.back()} data-testid="detail-modal">
          <DetailView
            slug={selectedName}
            rewriteLink="/"
            queryParams={router.query}
          />
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
            value={type}
            onChange={(value) => updateUrl({ type: value })}
          />
        </div>
      </div>
      <PokemonList search={search} type={type} isFavorite={!!favorite} />
    </>
  );
};
