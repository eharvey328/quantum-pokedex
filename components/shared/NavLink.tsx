import Link from "next/link";
import { useRouter } from "next/router";
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
} from "react";

import styles from "./shared.module.scss";

export interface NavLinkProps {
  href: string;
  children: ReactElement;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const { asPath, isReady } = useRouter();

  const child = Children.only(children) as ReactElement;
  const childClassName = child?.props?.className ?? "";
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      const linkPathname = new URL(href, location.href).pathname;
      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;
      const newClassName =
        linkPathname === activePathname
          ? `${childClassName} ${styles.NavLink_active}`
          : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [asPath, isReady, childClassName, setClassName, className, href]);

  return (
    <Link href={href} passHref replace legacyBehavior>
      {cloneElement(child, {
        className: className ?? null,
      })}
    </Link>
  );
};
