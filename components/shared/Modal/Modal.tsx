import ModalUnstyled, { ModalUnstyledProps } from "@mui/base/ModalUnstyled";
import clsx from "clsx";
import React, { ForwardedRef, forwardRef } from "react";

import styles from "./Modal.module.scss";

const Backdrop = React.forwardRef(function _Backdrop(
  props: ModalUnstyledProps & { ownerState: unknown },
  ref: ForwardedRef<HTMLDivElement>
) {
  const { open, className, ownerState, ...other } = props;
  return (
    <div
      className={clsx(styles.backdrop, { "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

export const Modal = forwardRef(function StyledModal(
  props: ModalUnstyledProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { className, ...other } = props;
  return (
    <ModalUnstyled
      className={clsx(styles.root, className)}
      slots={{ backdrop: Backdrop }}
      ref={ref}
      {...other}
    />
  );
});
