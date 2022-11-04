import { extendTheme } from "@mui/joy";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "var(--joy-palette-neutral-50)",
        },
      },
    },
  },
});
// console.log(theme);
