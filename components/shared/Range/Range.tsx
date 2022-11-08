import SliderUnstyled, { SliderUnstyledProps } from "@mui/base/SliderUnstyled";
import clsx from "clsx";
import React from "react";

import styles from "./Range.module.scss";

export interface RangeProps extends SliderUnstyledProps {
  label: string;
  min: number;
  max: number;
  value: number;
}

export const Range = ({
  label,
  value,
  min,
  max,
  className,
  ...props
}: RangeProps) => {
  const labelId = `${label}-label`;
  const padding = (max - min) * 0.1 + min;
  const paddedValue = Math.max(value, padding);

  return (
    <div className={styles.root}>
      <label id={labelId} className={styles.label}>
        {label}:
      </label>
      <SliderUnstyled
        {...props}
        className={clsx(styles.slider, className)}
        min={min}
        max={Math.max(value, max)}
        value={paddedValue}
        disabled
        valueLabelDisplay="on"
        valueLabelFormat={() => value}
        slotProps={{
          rail: { className: styles.rail },
          track: { className: styles.track },
          thumb: { className: styles.thumb },
          valueLabel: { className: styles.value },
          input: {
            readOnly: true,
            disabled: false,
            tabIndex: -1,
            "aria-labelledby": labelId,
          },
        }}
      />
    </div>
  );
};
