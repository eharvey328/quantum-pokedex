import { ReactNode } from "react";

import styles from "./Layout.module.scss";

export interface LayoutProps {
  children: ReactNode;
  size?: string;
}
export const Layout = ({ children, size }: LayoutProps) => {
  return (
    <main className={size ? styles.main_sm : styles.main}>{children}</main>
  );
};
