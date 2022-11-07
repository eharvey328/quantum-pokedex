// import ClearIcon from "@mui/icons-material/ClearRounded";
// import SearchIcon from "@mui/icons-material/SearchRounded";
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
  const [value, setValue] = useState(defaultValue);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.key !== "Enter") return;
    const newValue = event.currentTarget.value;
    setValue(newValue);
    onChange(newValue);
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
          <Button onClick={clear}>
            <Icon name="close" label="clear" />
          </Button>
        )
      }
    />
  );
};
