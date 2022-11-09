import { OptionUnstyled, OptionUnstyledProps } from "@mui/base";
import SelectUnstyled, {
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
} from "@mui/base/SelectUnstyled";
import clsx from "clsx";
import { forwardRef, ForwardedRef } from "react";

import { Icon } from "../Icon/Icon";

import styles from "./Select.module.scss";

const SelectRoot = forwardRef(function Button<TValue extends {}>(
  props: SelectUnstyledRootSlotProps<TValue>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <Icon name="unfold-more" size="sm" />
    </button>
  );
});

export const Select = ({
  className,
  ...props
}: SelectUnstyledProps<string>) => {
  return (
    <SelectUnstyled
      slots={{ root: SelectRoot }}
      slotProps={{
        root: { className: styles.root },
        listbox: { className: styles.listbox },
        popper: { className: styles.popper },
        ...props.slotProps,
      }}
      className={clsx(className, { [styles.default]: props?.value === "" })}
      {...props}
    />
  );
};

export const Option = ({
  className,
  ...props
}: OptionUnstyledProps<string>) => {
  return (
    <OptionUnstyled
      className={clsx(styles.option, className, {
        [styles.default]: props?.value === "",
      })}
      {...props}
    />
  );
};
