import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useSnackbar } from "@mui/base/SnackbarUnstyled";
import { ReactNode } from "react";

import styles from "./Snackbar.module.scss";

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Snackbar = ({ open, onClose, children }: SnackbarProps) => {
  const { getRootProps, onClickAway } = useSnackbar({
    onClose,
    open,
    autoHideDuration: 3000,
  });

  if (!open) return null;

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className={styles.root} {...getRootProps()}>
        {children}
      </div>
    </ClickAwayListener>
  );
};
