import React, { ReactElement } from 'react'
import Router from 'next/router';



import * as yup from 'yup'
import { 
	Field, 
	FieldArray, 
	Form, 
	Formik 
} from 'formik';
import Box from '@mui/material/Box';


import { Button } from '@mui/material'
import { TextField } from 'formik-mui'


// Queries
import { CREATE_LEARNING_LINE, GET_ALL_LEARNING_LINES } from '../../../../graphql/learningLines';
import client from '../../../../apollo-client';

// Custom Components
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'
import { CREATE_COURSE } from '../../../../graphql/courses';
import { GET_ALL_SPECIALISATIONS } from '../../../../graphql/specialisations';
import { LearningLine, Specialisation } from '../../../../interfaces';
import CustomSingleSelect from '../../../components/Admin/Form/CustomSingleSelect';
import { AsyncLocalStorage } from 'async_hooks';
import { CREATE_COMPANY } from '../../../../graphql/companies';


const validationSchema = yup.object({
	name: yup.string().required('Naam is verplicht'),
	
	// specialisationId: yup.string().required('Naam is verplicht'),
	// color: yup.string().matches(/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)/, 'Kleur moet een hexadecimaal getal zijn, bv. #FFFFFF').required('Kleur is verplicht')
});

interface createCompanyProps {
	
}

export default function createCompany({ }: createCompanyProps): ReactElement {
	return (
		<BasicContainer title="Nieuw Bedrijf">
			<Dashboard title="Nieuw Bedrijf">
				<Box
					sx={{
						maxWidth: 'md',
						border: '1px solid #e0e0e0',
					}}
				>
					<Formik
						initialValues={{
							name: '',
							
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => { 
							setSubmitting(true);

							const responseQuery = client.mutate({
								mutation: CREATE_COMPANY, 
								variables: {
									input: {
										name: values.name,
										
									}
								}
							});

							if(responseQuery) {
								// setSubmitting(false);
								
								// console.log(Router.pathname.split('/create') );
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
										name="name"
										type="text"
										label="Naam"
										helperText="Naam van het bedrijf"
										multiline
										maxRows={2}
										sx={{
											width: '100%',
											// maxWidth: 'lg'
										}}
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

	const queryMultiple = async() => {
		const query_LearningLines =  await client.query({
			query: GET_ALL_LEARNING_LINES
		});
		
		const query_Specialisations = await client.query({
			query: GET_ALL_SPECIALISATIONS
		});

		return [query_LearningLines, query_Specialisations];
	}
    // const { data, error } = await client.query({
    //     query: GET_ALL_LEARNING_LINES
    // });

	const [query_LearningLines, query_Specialisations] = await queryMultiple();
	const { data, error, loading } = query_LearningLines;
	const { data: data_Specialisations, error: error_Specialisations, loading: loading_Specialisations } = query_Specialisations;


	// let learningLines:LearningLine[] = [];
	// let specialisations:Specialisation[] = [];

	// Promise.all([query_LearningLines, query_Specialisations]).then(values => {
	// 	// console.log('data....', values[0]);	
	// 	learningLines = values[0].data.learningLines;
	// 	specialisations = values[1].data.specialisations;
	// 	}
	// );
	// console.log('afstudeerrrichitngne....', specialisations);
		
    return {
        props: {
            learningLines: data.learningLines,
			specialisations: data_Specialisations.specialisations,
        },
    };

	
}
