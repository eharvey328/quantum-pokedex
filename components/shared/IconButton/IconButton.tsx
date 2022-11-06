import { ButtonUnstyled, ButtonUnstyledProps } from "@mui/base";

import styles from "./IconButton.module.scss";

export const IconButton = ({ className, ...props }: ButtonUnstyledProps) => (
  <ButtonUnstyled className={`${styles.root} ${className ?? ""}`} {...props} />
);
