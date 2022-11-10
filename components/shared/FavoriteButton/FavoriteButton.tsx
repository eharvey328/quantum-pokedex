import { ButtonUnstyledProps } from "@mui/base";
import clsx from "clsx";

import { useFavorite, useUnFavorite } from "@lib/mutations";

import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

import styles from "./FavoriteButton.module.scss";

export interface FavoriteButtonProps
  extends Omit<ButtonUnstyledProps, "onError"> {
  isFavorite: boolean;
  pokemonId: string;
  onError: (message: string) => void;
}

export const FavoriteButton = ({
  isFavorite,
  pokemonId,
  onError,
  ...props
}: FavoriteButtonProps) => {
  const [favorite] = useFavorite();
  const [unFavorite] = useUnFavorite();
  const label = isFavorite ? "unfavorite" : "favorite";

  const handleFavoriteClick = () => {
    const mutation = isFavorite ? unFavorite : favorite;
    mutation({ variables: { id: pokemonId } }).catch(() => {
      onError(`An error occurred: Unable to ${label}`);
    });
  };

  return (
    <Button {...props} onClick={handleFavoriteClick} aria-label={label}>
      <Icon
        className={clsx(styles.icon, { [styles.favorited]: isFavorite })}
        name={isFavorite ? "favorite-filled" : "favorite"}
        label="favorite"
      />
    </Button>
  );
};
