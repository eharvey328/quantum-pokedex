import clsx from "clsx";

import { Icon } from "..";

import styles from "./PokemonTypeIcon.module.scss";

export interface PokemonTypeIconProps {
  type: string;
  className?: string;
}

export const PokemonTypeIcon = ({ type, className }: PokemonTypeIconProps) => {
  const normalizedType = type.toLowerCase();
  return (
    <div className={clsx(`bg-${normalizedType}`, styles.container, className)}>
      <Icon name={normalizedType} />
    </div>
  );
};
