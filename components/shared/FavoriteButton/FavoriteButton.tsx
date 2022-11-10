import { ButtonUnstyledProps } from "@mui/base";
import clsx from "clsx";

import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

import styles from "./FavoriteButton.module.scss";
import { useFavorite, useUnFavorite } from "@lib/mutations";

export interface FavoriteButtonProps extends ButtonUnstyledProps {
  isFavorite: boolean;
  pokemonId: string;
}

export const FavoriteButton = ({
  isFavorite,
  pokemonId,
  ...props
}: FavoriteButtonProps) => {
  const [favorite] = useFavorite();
  const [unFavorite] = useUnFavorite();

  const handleFavoriteClick = () => {
    isFavorite
      ? unFavorite({ variables: { id: pokemonId } })
      : favorite({ variables: { id: pokemonId } });
  };

  return (
    <Button
      {...props}
      onClick={handleFavoriteClick}
      aria-label={isFavorite ? "unfavorite" : "favorite"}
    >
      <Icon
        className={clsx(styles.icon, { [styles.favorited]: isFavorite })}
        name={isFavorite ? "favorite-filled" : "favorite"}
        label="favorite"
      />
    </Button>
  );
};
