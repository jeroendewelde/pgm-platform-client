import React, { ReactElement } from 'react'
import Router, { useRouter } from 'next/router'
import { GET_SPECIALISATION_BY_ID, UPDATE_SPECIALISATION } from '../../../../../graphql/specialisations';
import { Specialisation } from '../../../../../interfaces';
import client from '../../../../../apollo-client';
import BasicContainer from '../../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../../components/Admin/Dashboard';
import { Box, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui'
import * as yup from 'yup'

const validationSchema = yup.object({
	name: yup.string().required('Naam is verplicht'),
	academicYear: yup.string().matches(/20[0-9]{2}-20[0-9]{2}/, 'De duurtijd moet in het formaat 2019-2021 zijn').required('Academiejaren is verplicht')
});

interface editSpecialisationProps {
	specialisation: Specialisation
}

export default function editSpecialisation({ specialisation }: editSpecialisationProps): ReactElement {
	const router = useRouter();
	const { id } = router.query;
	return (
		<BasicContainer title="Bewerk Afstudeerrichting" >
			<Dashboard title="Bewerk Afstudeerrichting">
			<Box
					sx={{
						maxWidth: 'lg',
					}}
				>
					<Formik
						initialValues={{
							name: specialisation.name ? specialisation.name : '', 
							academicYear: specialisation.academicYear ? specialisation.academicYear : '',
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => { 
							setSubmitting(true);

							const responseQuery = client.mutate({
								mutation: UPDATE_SPECIALISATION, 
								variables: {
									input: {
										name: values.name,
										academicYear: values.academicYear,
									},
									id: specialisation.id
								}
							});

							if(responseQuery) {
								// setSubmitting(false);
								// console.log('pathname.....',Router.pathname);
								
								const split = Router.pathname.split(`/`);
								Router.push(`/admin/${split[2]}`);
							}
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
										value={values.name ? values.name : specialisation.name}
										helperText="Naam van de afstudeerrichting"
										multiline
										maxRows={2}
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
										name="academicYear"
										type="text"
										label="Academiejaren"
										helperText="Academiejaren in formaat 2019-2021"
										value={values.name ? values.academicYear : specialisation.academicYear}
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

										Pas aan
									</Button>
								</Box>
								<pre>{JSON.stringify(values, null, 2)}</pre>
							</Form>
						)}
					</Formik>
				</Box>

			</Dashboard>
		</BasicContainer>
	)
}

export async function getServerSideProps(context: any) {
	let id = context.params.id;
	console.log(id);
	typeof id === 'string' ? id = parseInt(id) : id;
	// const { id } = router.query;

	const { data, loading, error } = await client.query({
		query: GET_SPECIALISATION_BY_ID,
		variables: {
			id: id
		}
	});

	if ( error ) {
		console.log(error);
	}

	if(!error && data) console.log('....data', data); 

	return {
		props: {
			specialisation: data.specialisation
		}
	}



}