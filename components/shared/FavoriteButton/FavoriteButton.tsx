import { ButtonUnstyledProps } from "@mui/base";
import clsx from "clsx";

import { Button, Icon } from "@components";

import styles from "./FavoriteButton.module.scss";

export interface FavoriteButtonProps extends ButtonUnstyledProps {
  filled: boolean;
}

export const FavoriteButton = ({ filled, ...props }: FavoriteButtonProps) => {
  return (
    <Button {...props}>
      <Icon
        className={clsx(styles.icon, { [styles.favorited]: filled })}
        name={filled ? "favorite-filled" : "favorite"}
        label="favorite"
      />
    </Button>
  );
};
