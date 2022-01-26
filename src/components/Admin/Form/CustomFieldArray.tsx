import { FieldArray } from 'formik'
import React, { ReactElement } from 'react'
import { Button } from '@mui/material'


interface customButtonProps {
	children: React.ReactNode
	onClick: any
	
}

function customButton (props: customButtonProps): ReactElement {
	return <Button
	variant="outlined"
	onClick={props.onClick}
	>
		{props.children}
	</Button>
}

interface CustomFieldArrayProps {
	name: string
	values: any[]

}

export default function CustomFieldArray({ name, values, ...props }: CustomFieldArrayProps): ReactElement {
	return (
		<FieldArray
			name={name}
			render={arrayHelpers => (
				<div>
					
				</div>
				)}

		/>
	)
}
