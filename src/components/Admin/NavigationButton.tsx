import { Button } from '@mui/material'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import Router, { useRouter } from 'next/router';

interface NavigationButtonProps {
	path?: string,
	title: string
}

export default function NavigationButton({ title, path='' }: NavigationButtonProps): ReactElement {
	const router = useRouter();
	return (
		// <Link href="/admin/specialisations/create">
		// <Link href={`${path}/create`}>
		<Link href={
			`${path === '' ?
			router.pathname : ('/admin/' + path)}
			/create`}>
			<Button 
				variant="outlined" 
				sx={{ 
					textTransform: 'capitalize', 
					mb: 2
				}}>
				{ title } Toevoegen
			</Button>
		</Link>
	)
}
