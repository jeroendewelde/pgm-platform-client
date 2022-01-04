// import PeopleIcon from '@mui/icons-material/People';
// import BusinessIcon from '@mui/icons-material/Business';





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
} from '@mui/icons-material'

import List from '@mui/material/List';

import { 
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material'

const routes = [
  {
    label: "Home",
    path: "/admin",
    icon: <Home/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Vakken",
    path: "/admin/courses",
    icon: <CollectionsBookmark/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Projecten",
    path: "/admin/projects",
    icon: <BackupTable/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Docenten",
    path: "/admin/teachers",
    icon: <HistoryEdu/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Studenten",
    path: "/admin/students",
    icon: <School/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Leerlijnen",
    path: "/admin/learling-lines",
    icon: <Category/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Afstudeerrichtingen",
    path: "/admin/specialisation",
    icon: <AltRoute/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Bedrijven",
    path: "/admin/company",
    icon: <Business/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Bijlagen",
    path: "/admin/attachment",
    icon: <Attachment/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Generaties",
    path: "/admin/generation",
    icon: <Groups/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  {
    label: "Personen",
    path: "/admin/people",
    icon: <People/>,
    // activeIcon: DashboardIconActive,
    // component: Dashboard,
  },
  
];

import React, { ReactElement } from 'react'
import MenuItem from './MenuItem';
import Link from 'next/link';

interface Props {
	
}

export default function MenuList({}: Props): ReactElement {
	return (
		<List>
			{routes.map((route, index) => (
				
				<MenuItem
				label={route.label}
				icon={route.icon}
				path={route.path}
				index={index}
				>
					{/* <People/> */}
					
				</MenuItem>
				
			))}
		</List>
	)
}
