import { InputUnstyled, InputUnstyledProps } from "@mui/base";
import * as React from "react";

import styles from "./Input.module.scss";

export const Input = ({
  startAdornment,
  endAdornment,
  ...props
}: InputUnstyledProps) => {
  return (
    <InputUnstyled
      className={styles.root}
      slotProps={{ input: { className: styles.input } }}
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
