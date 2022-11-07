import { ButtonUnstyled, ButtonUnstyledProps } from "@mui/base";

import styles from "./Button.module.scss";

export const Button = ({ className, ...props }: ButtonUnstyledProps) => (
  <ButtonUnstyled className={`${styles.root} ${className ?? ""}`} {...props} />
);
