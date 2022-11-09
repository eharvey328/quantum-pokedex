import clsx from "clsx";
import { KeyboardEvent, useState } from "react";

import { Input, Button, Icon } from "..";

export interface SearchInputProps {
  defaultValue?: string;
  className?: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({
  defaultValue,
  className,
  onChange,
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue ?? "");

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key !== "Enter") return;
    onChange(value);
  };

  const clear = () => {
    setValue("");
    onChange("");
  };

  return (
    <Input
      className={clsx(className)}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyUp={handleKeyUp}
      placeholder="Search for Pokémon"
      startAdornment={<Icon name="search" />}
      endAdornment={
        value && (
          <Button onClick={clear} aria-label="clear">
            <Icon name="close" label="clear" />
          </Button>
        )
      }
    />
  );
};
