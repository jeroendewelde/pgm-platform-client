import React, { ReactElement } from "react";

import {
  AltRoute,
  Attachment,
  BackupTable,
  Business,
  Category,
  CollectionsBookmark,
  Groups,
  HistoryEdu,
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
    // component: Dashboard,
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
    // component: Dashboard,
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
    // component: Dashboard,
  },
  {
    label: "Docenten",
    path: "/admin/teachers",
    icon: <HistoryEdu />,
    activeIcon: (
      <HistoryEdu
        sx={{
          color: colors.primary,
        }}
      />
    ),
    // component: Dashboard,
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
    // component: Dashboard,
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
    // component: Dashboard,
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
    // component: Dashboard,
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
    // component: Dashboard,
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
    // component: Dashboard,
  },
  //   {
  //     label: "Bijlagen",
  //     path: "/admin/attachments",
  //     icon: <Attachment/>,
  //     activeIcon: <Attachment sx={{
  // 		color: colors.primary
  // 	}}/>,
  //     // component: Dashboard,
  //   },
  //   {
  //     label: "Generaties",
  //     path: "/admin/generations",
  //     icon: <Groups/>,
  //     activeIcon: <Groups sx={{
  // 		color: colors.primary
  // 	}}/>,
  //     // component: Dashboard,
  //   },
  //   {
  //     label: "Personen",
  //     path: "/admin/persons",
  //     icon: <People/>,
  //     activeIcon: <People sx={{
  // 		color: colors.primary
  // 	}}/>,
  //     // component: Dashboard,
  //   },
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
