import styles from "./shared.module.scss";

export interface PokemonTypeIconProps {
  type: string;
}

export const PokemonTypeIcon = ({ type }: PokemonTypeIconProps) => {
  const normalizedType = type.toLowerCase();
  return (
    <span className={`${styles.icon_container} bg-${normalizedType}`}>
      <i className={`pokemon-type-${normalizedType}`} />
    </span>
  );
};
