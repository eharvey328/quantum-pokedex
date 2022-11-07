import clsx from "clsx";
import { ReactNode } from "react";

import styles from "./Pill.module.scss";

export interface PillItem {
  label: string;
  value: number;
  icon?: ReactNode;
}

export interface PillProps<T = unknown> {
  value: number;
  name: string;
  items: PillItem[];
  onChange: (value: T) => void;
}

export const Pill = ({ value, name, items, onChange }: PillProps) => {
  return (
    <fieldset className={styles.radiogroup} role="radiogroup">
      <legend className={styles.legend}>{name}</legend>
      {items.map((item) => {
        const checked = value === item.value;
        return (
          <label
            key={item.label}
            className={clsx(styles.label, { [styles.selected]: checked })}
          >
            <input
              className={styles.radio}
              type="radio"
              name="pill"
              value={item.value}
              checked={checked}
              onChange={() => onChange(item.value)}
            />
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            {item.label}
          </label>
        );
      })}
    </fieldset>
  );
};
