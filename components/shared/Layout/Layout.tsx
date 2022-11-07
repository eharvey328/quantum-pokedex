import Link from "next/link";
import { ReactNode } from "react";

import { Button, Icon } from "@components/shared";

import styles from "./Layout.module.scss";

export interface LayoutProps {
  children: ReactNode;
  size?: string;
  backLink?: string;
}
export const Layout = ({ children, size, backLink }: LayoutProps) => {
  return (
    <main className={size ? styles.main_sm : styles.main}>{children}</main>
  );
};
