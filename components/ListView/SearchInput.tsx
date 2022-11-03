import ClearIcon from "@mui/icons-material/ClearRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import { KeyboardEvent, useState } from "react";

export interface SearchInputProps {
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ defaultValue, onChange }: SearchInputProps) => {
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
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyUp={handleKeyUp}
      size="lg"
      placeholder="Search for Pokemon"
      startDecorator={<SearchIcon />}
      endDecorator={
        value && (
          <IconButton size="sm" variant="plain" color="neutral" onClick={clear}>
            <ClearIcon />
          </IconButton>
        )
      }
    />
  );
};
