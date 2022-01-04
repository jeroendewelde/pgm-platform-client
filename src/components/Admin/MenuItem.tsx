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
        <ListItem 
			button
		>
			<ListItemIcon
			>
				{
					active ? activeIcon : icon
				}
			</ListItemIcon>
			<ListItemText primary={label} sx={{
				color: active ? colors.primary : 'text'

			}}/>
		</ListItem>
		</Link>
    )
}
