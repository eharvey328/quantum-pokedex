import { ReactNode } from "react";

import styles from "./shared.module.scss";

export interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return <main className={styles.main}>{children}</main>;
};
