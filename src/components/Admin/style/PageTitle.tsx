import Head from 'next/head'
import React, { ReactElement } from 'react'

interface PageTitleProps {
	title: string
}

export default function PageTitle({ title }: PageTitleProps): ReactElement {
	return (
		<Head>
			<title>{title } | Admin Panel | Graduaat Programmeren</title>
		</Head>
	)
}
