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


const validationSchema = yup.object({
	name: yup.string().required('Naam is verplicht'),
	description: yup.string().required('Beschrijving is verplicht'),
	academicYear: yup.string().matches(/20[0-9]{2}-20[0-9]{2}/, 'De duurtijd moet in het formaat 2019-2020 zijn').required('Academiejaar is verplicht'),
	learningLineId: yup.number().required('Leerlijn is verplicht'),
	// specialisationId: yup.string().required('Naam is verplicht'),
	// color: yup.string().matches(/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)/, 'Kleur moet een hexadecimaal getal zijn, bv. #FFFFFF').required('Kleur is verplicht')
});

interface createCourseProps {
	learningLines: LearningLine[]
	specialisations: Specialisation[]
}

export default function createCourse({learningLines, specialisations}: createCourseProps): ReactElement {
	return (
		<BasicContainer title="Nieuw Vak" >
			<Dashboard title="Nieuw Vak">
				<Box
					sx={{
						maxWidth: 'md',
						border: '1px solid #e0e0e0',
					}}
				>
					<Formik
						initialValues={{
							name: '',
							description: '',
							term: '',
							academicYear: '',
							// tags: [],
							learningLineId: '',
							specialisationId: '',
							// attachments: [],
							// teachers: [],
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => { 
							setSubmitting(true);

							const responseQuery = client.mutate({
								mutation: CREATE_COURSE, 
								variables: {
									input: {
										name: values.name,
										description: values.description,
										term: values.term,
										academicYear: values.academicYear,
										// tags: values.tags,
										learningLineId: values.learningLineId,
										specialisationId: values.specialisationId,
										// attachments: values.attachments,
										// teachers: values.teachers,
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
										helperText="Naam van het vak"
										multiline
										maxRows={2}
										sx={{
											width: '100%',
											// maxWidth: 'lg'
										}}
									/>
								</Box>
								<Box margin={1}>
									<Field
										required
										component={TextField}
										name="description"
										type="text"
										label="Beschrijving"
										helperText="Beschrijving van het vak"
										multiline
										sx={{
											width: '100%',
										}}
										// fullWidth
										/>
								</Box>
								{/* <Box margin={1}> */}
								<Box sx={{
									border: '1px solid #e0e0e0',
									width: '100%'
								}}>
									<Field
										required
										component={TextField}
										name="term"
										type="number"
										label="Periode"
										helperText="Periode van het vak"
										sx={{
											minWidth: '25%',
											margin: 1
										}}
										// fullWidth
										/>
								{/* </Box> */}
								{/* <Box margin={1}> */}
									<Field
										required
										component={TextField}
										name="academicYear"
										type="text"
										label="Academiejaar"
										helperText="Academiejaar in formaat 2019-2020"
										sx={{
											minWidth: '25%',
											margin: 1
										}}
										// fullWidth
										/>
								</Box>
								{/* <Box sx={{
									border: '1px solid #e0e0e0',
									width: '100%',
									display: 'flex',
									justifyContent: 'stretch'
								}}> */}

								

								<Box sx={{
									margin: 1
									// display: 'flex',
									// gap: 2
								}}>
									<Field
										required
										component={CustomSingleSelect}
										label="Leerlijn"
										name="learningLineId"
										data={learningLines}
										sx={{
											// minWidth: '45%',
											// minWidth: '40%',
											width: '50%',
											flexGrow: 1,
											
											// margin: 1,
											border: '1px solid #e0e0e0',
										}}
										helperText="Naam van de Leerlijn"
										
										// name="academicYear"
										// type="text"
										// label="Academiejaar"
										// helperText="Academiejaar in formaat 2019-2020"
										// fullWidth
										/>
								</Box>

								<Box margin={1}>
									<Field
										required
										component={CustomSingleSelect}
										label="Afstudeerrichting"
										name="specialisationId"
										data={specialisations}
										extraData={'academicYear'}
										sx={{
											minWidth: '50%',
											// minWidth: '40%',
											// margin: 1
										}}
										helperText="Naam van de Afstudeerrrichting"
										
										// name="academicYear"
										// type="text"
										// label="Academiejaar"
										// helperText="Academiejaar in formaat 2019-2020"
										// fullWidth
										/>
								</Box>
								{/* </Box> */}

								






								
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
