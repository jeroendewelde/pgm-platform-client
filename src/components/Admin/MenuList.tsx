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

import { colors } from '../../utils/constants';

const routes = [
  {
    label: "Home",
    path: "/admin",
    icon: <Home/>,
    activeIcon: <Home sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Vakken",
    path: "/admin/courses",
    icon: <CollectionsBookmark/>,
    activeIcon: <CollectionsBookmark sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Projecten",
    path: "/admin/projects",
    icon: <BackupTable/>,
    activeIcon: <BackupTable sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Docenten",
    path: "/admin/teachers",
    icon: <HistoryEdu/>,
    activeIcon: <HistoryEdu sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Studenten",
    path: "/admin/students",
    icon: <School/>,
    activeIcon: <School sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Leerlijnen",
    path: "/admin/learning-lines",
    icon: <Category/>,
    activeIcon: <Category sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Afstudeerrichtingen",
    path: "/admin/specialisation",
    icon: <AltRoute/>,
    activeIcon: <AltRoute sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Bedrijven",
    path: "/admin/company",
    icon: <Business/>,
    activeIcon: <Business sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Bijlagen",
    path: "/admin/attachment",
    icon: <Attachment/>,
    activeIcon: <Attachment sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Generaties",
    path: "/admin/generation",
    icon: <Groups/>,
    activeIcon: <Groups sx={{
		color: colors.primary
	}}/>,
    // component: Dashboard,
  },
  {
    label: "Personen",
    path: "/admin/people",
    icon: <People/>,
    activeIcon: <People sx={{
		color: colors.primary
	}}/>,
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
				activeIcon={route.activeIcon}
				path={route.path}
				index={index}
				>
					{/* <People/> */}
					
				</MenuItem>
				
			))}
		</List>
	)
}
