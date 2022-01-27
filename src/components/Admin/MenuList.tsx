import React, { ReactElement } from "react";

import {
  AltRoute,
  BackupTable,
  Business,
  Category,
  CollectionsBookmark,
  Home,
  People,
  School,
  FormatQuote,
} from "@mui/icons-material";

import List from "@mui/material/List";

import { colors } from "../../utils/constants";

const routes = [
  {
    label: "Home",
    path: "/admin",
    icon: <Home />,
    activeIcon: (
      <Home
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Vakken",
    path: "/admin/courses",
    icon: <CollectionsBookmark />,
    activeIcon: (
      <CollectionsBookmark
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Projecten",
    path: "/admin/projects",
    icon: <BackupTable />,
    activeIcon: (
      <BackupTable
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Docenten",
    path: "/admin/teachers",
    icon: <People />,
    activeIcon: (
      <People
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Studenten",
    path: "/admin/students",
    icon: <School />,
    activeIcon: (
      <School
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Leerlijnen",
    path: "/admin/learning-lines",
    icon: <Category />,
    activeIcon: (
      <Category
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Afstudeerrichtingen",
    path: "/admin/specialisations",
    icon: <AltRoute />,
    activeIcon: (
      <AltRoute
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Leerbedrijven",
    path: "/admin/companies",
    icon: <Business />,
    activeIcon: (
      <Business
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
  {
    label: "Testimonials",
    path: "/admin/testimonials",
    icon: <FormatQuote />,
    activeIcon: (
      <FormatQuote
        sx={{
          color: colors.primary,
        }}
      />
    ),
  },
];

// Custom imports
import MenuItem from "./MenuItem";

interface MenuListProps {}

export default function MenuList({}: MenuListProps): ReactElement {
  return (
    <List>
      {routes.map((route, index) => (
        <MenuItem
          label={route.label}
          icon={route.icon}
          activeIcon={route.activeIcon}
          path={route.path}
          index={index}
          key={index}
        />
      ))}
    </List>
  );
}
