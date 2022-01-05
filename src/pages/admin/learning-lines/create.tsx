import React, { ReactElement } from 'react'
import * as yup from 'yup'

import Box from '@mui/material/Box';
import Router from 'next/router';

// import TextField from '@mui/material/TextField';
// import { TextField } from 'formik-mui'


import { Field, Form, Formik } from 'formik';


// import { Button, TextField } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from 'formik-mui'
import client from '../../../../apollo-client';


// import { CREATE_LEARNING_LINE } from '../../../../graphql/graphql/learningLines';
import { CREATE_LEARNING_LINE, CREATE_LEARNING_LINE_NEW } from '../../../../graphql/learningLines';
import { UpperCasingTextField } from '../../../components/Admin/Form/UpperCasingTextField';

// Custom Components
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'
import DataGridContent from '../../../components/Admin/DataGridContent';

interface Props {
	
}



const validationSchema = yup.object({
	name: yup.string().required('Naam is verplicht'),
	color: yup.string().required('Kleur is verplicht'),
});

export default function create({}: Props): ReactElement {
	console.log('LAAD PAGINA....');


	return (
		<BasicContainer title="Nieuwe Leerlijn" >
			<Dashboard title="Nieuwe Leerlijn">
				<Formik
					initialValues={{
						name: '',
						color: '',
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => { 
						setSubmitting(true);

						const responseQuery = client.mutate({
							mutation: CREATE_LEARNING_LINE_NEW, 
							variables: {
								input: {
									name: values.name,
									color: values.color,
								}
							}
						});

						if(responseQuery) {
							// setSubmitting(false);
							Router.push('/admin/learning-lines');
						}
						


						// console.log('response....', responseQUERY);

						// if(!loading && data) {
						// 	console.log('data....', data);
						// 	setSubmitting(false);
						// }
						// if(error) {
						// 	console.log('error....', error);
						// }


						// console.log('start submut', values);
						
						// setTimeout(() => {
						// 	setSubmitting(false);
						// 	alert(JSON.stringify(values, null, 2));
						// }, 500);
					}}
				>
					{({values, submitForm, isSubmitting}) => (
						<Form>
							<Box margin={1}>
								<Field
									required
									component={TextField}
									name="name"
									type="text"
									label="Naam"
									helperText="Naam van de leerlijn"
								/>
							</Box>
							<Box margin={1}>
								<Field
									required
									component={TextField}
									name="color"
									type="text"
									label="Kleur"
									helperText="Kleur van de leerlijn"
									// fullWidth
									/>
							</Box>
							<Box margin={1}>
								<Button
									sx={{ margin: 1 }}
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
									// type="submit"
								>

									Submit
								</Button>
							</Box>
							<pre>{JSON.stringify(values, null, 2)}</pre>
						</Form>
					)}
				</Formik>
		</Dashboard>
		</BasicContainer>
	  );
}
