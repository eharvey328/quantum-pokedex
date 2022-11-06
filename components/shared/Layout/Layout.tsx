import { ReactNode } from "react";

import styles from "./Layout.module.scss";

export interface LayoutProps {
  title: string;
  children: ReactNode;
}
export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.page_header}>{title}</h1>
      {children}
    </main>
  );
};
