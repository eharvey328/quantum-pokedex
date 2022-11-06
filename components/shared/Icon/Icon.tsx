import clsx from "clsx";
import { SVGProps } from "react";

import styles from "./Icon.module.scss";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Icon = ({
  name,
  label,
  size = "md",
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      className={clsx(styles.svg, className, {
        [styles.sm]: size === "sm",
        [styles.lg]: size === "lg",
      })}
      focusable="false"
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <use xlinkHref={`#icon-${name}`} />
      <title>{label ?? name}</title>
    </svg>
  );
};
