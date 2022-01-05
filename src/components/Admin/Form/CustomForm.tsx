import { Formik } from 'formik'
import React, { ReactElement } from 'react'

interface Props {
	initialValues: any
	onSubmit: any
	validationSchema: any
	children: any

}

export default function CustomForm({initialValues, onSubmit, validationSchema, children}: Props): ReactElement {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{ () => (
				<>
					{ children }
				</>
			)}
		</Formik>
	)
}
