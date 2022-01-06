import React, { ReactElement } from 'react'
import Router from 'next/router';


import * as yup from 'yup'
import { 
	Field, 
	Form, 
	Formik 
} from 'formik';
import Box from '@mui/material/Box';


import { Button } from '@mui/material'
import { TextField } from 'formik-mui'


// Queries
import { CREATE_LEARNING_LINE } from '../../../../graphql/learningLines';
import client from '../../../../apollo-client';

// Custom Components
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'
import { CREATE_SPECIALISATION } from '../../../../graphql/specialisations';
import { GET_ALL_PERSON_TYPES } from '../../../../graphql/enums';
import CustomSingleSelect from '../../../components/Admin/Form/CustomSingleSelect';
import CustomSingleSelectForEnum from '../../../components/Admin/Form/CustomSingleSelectForEnum';
import { CREATE_PERSON } from '../../../../graphql/persons';


const validationSchema = yup.object({
	firstName: yup.string().required('Voornaam is verplicht'),
	lastName: yup.string().required('Familienaam is verplicht'),
	type: yup.string().required('Type is verplicht'),
});

interface createPersonProps {
	personTypes: any
}

export default function createPerson({personTypes}: createPersonProps): ReactElement {
	return (
		<BasicContainer title="Nieuwe Persoon" >
			<Dashboard title="Nieuwe Persoon">
				<Box
					sx={{
						maxWidth: 'lg',
					}}
				>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							type: '',
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => { 
							setSubmitting(true);

							const responseQuery = client.mutate({
								mutation: CREATE_PERSON, 
								variables: {
									input: {
										firstName: values.firstName,
										lastName: values.lastName,
										type: values.type,
									}
								}
							});

							if(responseQuery) {
								// setSubmitting(false);
								Router.push(Router.pathname.split('/create')[0] );
							}
						}}
					>
						{({values, submitForm, isSubmitting}) => (
							<Form>
								<Box margin={1}>
									<Field
										required
										component={TextField}
										name="firstName"
										type="text"
										label="Voornaam"
										helperText=""
										sx={{
											width: '75%',
											// maxWidth: 'lg'
										}}
									/>
								</Box>
								<Box margin={1}>
									<Field
										required
										component={TextField}
										name="lastName"
										type="text"
										label="Familienaam"
										helperText=""
										sx={{
											width: '75%',
											// maxWidth: 'lg'
										}}
									/>
								</Box>

								<Box sx={{
									margin: 1
									// display: 'flex',
									// gap: 2
								}}>
									<Field
										required
										component={CustomSingleSelectForEnum}
										label="Type"
										name="type"
										data={personTypes}
										sx={{
											width: '50%',
										}}
										helperText="Type van de persoon"
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

										Maak aan
									</Button>
								</Box>
								<pre>{JSON.stringify(values, null, 2)}</pre>
							</Form>
						)}
					</Formik>
				</Box>
			</Dashboard>
		</BasicContainer>
	  );
}

export async function getServerSideProps() {
	const { data, error } = await client.query({
		query: GET_ALL_PERSON_TYPES,
	});

	if (error) {
		console.log(error);
	}

	console.log('data...', data.__type.enumValues)

	return {
		props: {
			personTypes: data.__type.enumValues,
		}
	}
}