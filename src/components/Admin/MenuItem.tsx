import { 
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import React, { ReactElement } from 'react'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Link from 'next/link';

interface MenuItemProps {
    label: String,
	icon: ReactElement,
	// children: ReactElement,
	path: String,
	index: number
}

export default function MenuItem({label, icon, path, index}: MenuItemProps): ReactElement {
    return (
		<Link href={path + ''} >
        <ListItem 
			button
		>
			<ListItemIcon>
				{ icon }
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItem>
		</Link>
    )
}
