import clsx from "clsx";
import { ChangeEvent, ReactNode, useState } from "react";

import styles from "./Pill.module.scss";

export interface PillItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface PillProps {
  name: string;
  items: PillItem[];
  className?: string;
  onChange?: (value: string) => void;
}

export const Pill = ({
  name,
  items,
  className,
  onChange = () => {},
}: PillProps) => {
  const [selected, setSelected] = useState(items[0].value);
  // const test = useIsFocusVisible();

  // console.log(test);
  return (
    <fieldset className={clsx(styles.radiogroup, className)} role="radiogroup">
      <legend className={styles.legend}>{name}</legend>
      {items.map(({ label, value, icon }) => {
        const checked = selected === value;
        return (
          <label
            key={label}
            className={`${styles.label} ${checked ? styles.selected : ""}`}
          >
            <input
              className={styles.radio}
              type="radio"
              name="pill"
              value={value}
              checked={checked}
              onChange={() => {
                setSelected(value);
                onChange(value);
              }}
            />
            {icon && <span className={styles.icon}>{icon}</span>}
            {label}
          </label>
        );
      })}
    </fieldset>
  );
};
