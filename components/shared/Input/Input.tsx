import { InputUnstyled, InputUnstyledProps } from "@mui/base";
import clsx from "clsx";
import * as React from "react";

import styles from "./Input.module.scss";

export const Input = ({
  startAdornment,
  endAdornment,
  className,
  inputRef,
  ...props
}: InputUnstyledProps) => {
  return (
    <InputUnstyled
      className={clsx(styles.root, className)}
      slotProps={{ input: { className: styles.input, ref: inputRef } }}
      {...props}
      startAdornment={
        startAdornment && (
          <div className={styles.adornment}>{startAdornment}</div>
        )
      }
      endAdornment={
        endAdornment && <div className={styles.adornment}>{endAdornment}</div>
      }
    />
  );
};
