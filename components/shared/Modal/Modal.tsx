import ModalUnstyled, { ModalUnstyledProps } from "@mui/base/ModalUnstyled";
import clsx from "clsx";
import React, { ForwardedRef, forwardRef } from "react";

import { Button, Icon } from "@components/shared";

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

interface ModalProps extends ModalUnstyledProps {
  onClose?: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick"
  ) => void;
}

export const Modal = forwardRef(function StyledModal(
  props: ModalProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { className, children, onClose = () => {}, ...other } = props;
  return (
    <ModalUnstyled
      className={clsx(styles.root, className)}
      slots={{ backdrop: Backdrop }}
      ref={ref}
      onClose={onClose}
      {...other}
    >
      <div className={styles.content}>
        <div className={styles.scroll_body}>
          <Button
            className={styles.close}
            onClick={(e) => onClose(e, "closeButtonClick")}
          >
            <Icon name="close" />
          </Button>
          {children}
        </div>
      </div>
    </ModalUnstyled>
  );
});
