import { 
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Link from 'next/link';
import { colors } from '../../utils/constants';
import { color } from '@mui/system';
import { Tooltip } from '@material-ui/core';

interface MenuItemProps {
    label: String,
	icon: ReactElement,
	// children: ReactElement,
	path: String,
	index: number
	activeIcon: ReactElement
}

export default function MenuItem({label, icon, path, index, activeIcon}: MenuItemProps): ReactElement {
	const [active, setActive] = useState(false);
	const location = useRouter();
	const pathname = location.pathname;
	

	useEffect(() => {
		if(path === pathname) {
			setActive(true);
		}
	}, [pathname])

    return (
		<Link href={path + ''} >
			<Tooltip title={label}>
        <ListItem 
			button
			// key={index}
		>
			<ListItemIcon
			>
				{
					active ? activeIcon : icon
				}
			</ListItemIcon>
			<ListItemText primary={label} sx={{
				color: active ? colors.primary : 'text',
				// '&:hover': {
				// 	color: colors.purple
				// }

			}}/>
		</ListItem>

			</Tooltip>
		</Link>
    )
}
