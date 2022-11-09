import { ParsedUrlQuery } from "querystring";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import styles from "./DetailView.module.scss";

export interface EvolutionItemProps {
  name: string;
  image: string;
  selected: boolean;
  rewriteLink?: string;
  queryParams?: ParsedUrlQuery;
}

export const EvolutionItem = ({
  name: displayName,
  image,
  selected,
  rewriteLink,
  queryParams,
}: EvolutionItemProps) => {
  const name = displayName.toLowerCase();

  const href = {
    pathname: rewriteLink ?? `/detail/${name}`,
    query: queryParams && { ...queryParams, name },
  };

  return (
    <Link
      className={clsx(styles.evolution, {
        [styles.evolution_selected]: selected,
      })}
      href={href}
      as={rewriteLink && `/detail/${name}`}
      replace
      shallow
      aria-label={name}
    >
      <Image
        className={styles.pokemon_image}
        src={image}
        alt={`${displayName} artwork`}
        fill
        sizes="100px"
      />
    </Link>
  );
};
