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
import { CREATE_COURSE, GET_ALL_COURSES } from '../../../../graphql/courses';
import { GET_ALL_SPECIALISATIONS } from '../../../../graphql/specialisations';
import { LearningLine, Specialisation } from '../../../../interfaces';
import CustomSingleSelect from '../../../components/Admin/Form/CustomSingleSelect';
import { AsyncLocalStorage } from 'async_hooks';
import { CREATE_PROJECT } from '../../../../graphql/projects';


const validationSchema = yup.object({
	name: yup.string().required('Projectnaam is verplicht'),
	teaserText: yup.string().required('Kleine teaser-text is verplicht'),
	body: yup.string().required('Grote beschrijving is verplicht'),
	academicYear: yup.string().matches(/20[0-9]{2}-20[0-9]{2}/, 'De duurtijd moet in het formaat 2019-2020 zijn').required('Academiejaar is verplicht'),
	tags: yup.array().of(yup.string()).required('Tags zijn verplicht'),
	courseId: yup.number().required('Vak is verplicht'),
});

interface createProjectProps {
	// learningLines: LearningLine[]
	// specialisations: Specialisation[]
	courses: Course[]
}

export default function createProject({courses}: createProjectProps): ReactElement {
	return (
		<BasicContainer title="Nieuw Project" >
			<Dashboard title="Nieuw Project">
				<Box
					sx={{
						maxWidth: 'md',
						border: '1px solid #e0e0e0',
					}}
				>
					<Formik
						initialValues={{
							name: '',
							teaserText: '',
							body: '',
							academicYear: '',
							tags: [],
							courseId: ''
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => { 
							setSubmitting(true);

							const responseQuery = client.mutate({
								mutation: CREATE_PROJECT, 
								variables: {
									input: {
										name: values.name,
										teaserText: values.teaserText,
										body: values.body,
										academicYear: values.academicYear,
										tags: values.tags,
										courseId: values.courseId
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
										helperText="Naam van het project"
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
										name="teaserText"
										type="text"
										label="Teaser text"
										helperText=""
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
										name="body"
										type="text"
										label="Body"
										helperText="Beschrijving van het project"
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
										label="Vak"
										name="courseId"
										data={courses}
										sx={{
											// minWidth: '45%',
											// minWidth: '40%',
											width: '50%',
											flexGrow: 1,
											
											// margin: 1,
											border: '1px solid #e0e0e0',
										}}
										helperText="Naam van het vak"
										
										// name="academicYear"
										// type="text"
										// label="Academiejaar"
										// helperText="Academiejaar in formaat 2019-2020"
										// fullWidth
										/>
								</Box>

								
								{/* </Box> */}

								


								
								<Box margin={1}>
								<FieldArray
             name="tags"
             render={arrayHelpers => (
               <div>
                 {values.tags && values.tags.length > 0 ? (
                   values.tags.map((tag, index) => (
                     <div key={index}>
                       <Field name={`tags.${index}`} />
                       <button
                         type="button"
                         onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                       >
                         -
                       </button>
                       <button
                         type="button"
                         onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                       >
                         +
                       </button>
                     </div>
                   ))
                 ) : (
                   <button type="button" onClick={() => arrayHelpers.push('')}>
                     {/* show this when user has removed all friends from the list */}
                     Add a tag
                   </button>
                 )}
                 <div>
                   <button type="submit">Submit</button>
                 </div>
               </div>
             )}
           />
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
		const query_Courses =  await client.query({
			query: GET_ALL_COURSES
		});
		
		// const query_Specialisations = await client.query({
		// 	query: GET_ALL_SPECIALISATIONS
		// });

		return [query_Courses];
	}
    // const { data, error } = await client.query({
    //     query: GET_ALL_LEARNING_LINES
    // });

	// const [query_LearningLines, query_Specialisations] = await queryMultiple();
	const [query_Courses] = await queryMultiple();
	const { data, error, loading } = query_Courses;
	// const { data: data_Specialisations, error: error_Specialisations, loading: loading_Specialisations } = query_Specialisations;


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
            courses: data.courses,
        },
    };

	
}
