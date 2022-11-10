import clsx from "clsx";

import { Icon } from "../Icon/Icon";

import styles from "./PokemonType.module.scss";

export interface PokemonTypeProps {
  type: string;
  display?: "icon" | "chip";
  className?: string;
}

export const PokemonType = ({
  type,
  display = "icon",
  className,
}: PokemonTypeProps) => {
  const normalizedType = type.toLowerCase();
  return (
    <div
      className={clsx(`bg-${normalizedType}`, className, {
        [styles.icon_container]: display === "icon",
        [styles.chip_container]: display === "chip",
      })}
    >
      <Icon className={styles.icon} name={normalizedType} />
      {display === "chip" && type}
    </div>
  );
};
