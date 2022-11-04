import AppsIcon from "@mui/icons-material/AppsRounded";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderRounded";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";

import { NavLink } from "./NavLink";
import styles from "./shared.module.scss";

const routes = [
  {
    path: "/",
    label: "All",
    icon: <AppsIcon />,
  },
  {
    path: "/favorites",
    label: "Favorites",
    icon: <FavoriteIcon />,
  },
];

export const Navigation = () => {
  return (
    <Tabs className={styles.Tabs}>
      <TabList component="nav" variant="plain" className={styles.TabList}>
        {routes.map(({ path, label, icon }) => (
          <NavLink key={label} href={path}>
            <Tab
              className={styles.NavLink}
              component="a"
              role="link"
              value={path}
            >
              <ListItemDecorator>{icon}</ListItemDecorator>
              {label}
            </Tab>
          </NavLink>
        ))}
      </TabList>
      <Box
        sx={(theme) => ({
          "--bg": theme.vars.palette.background.level3,
          height: "1px",
          background: "var(--bg)",
          boxShadow: "0 0 0 100% var(--bg)",
          clipPath: "inset(0 -100%)",
        })}
      />
    </Tabs>
  );
};
