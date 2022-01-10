import React, { ReactElement } from 'react'
import Router from 'next/router';


import * as yup from 'yup'
import { 
	Field, 
	Form, 
	Formik 
} from 'formik';
import Box from '@mui/material/Box';


import { Button, Fab, Typography } from '@mui/material'
import { TextField as TextFieldMui } from '@mui/material'
import { TextField } from 'formik-mui'


//DATE PICKER
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// Queries
import { CREATE_LEARNING_LINE } from '../../../../graphql/learningLines';
import client from '../../../../apollo-client';

// Custom Components
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'
import { CREATE_SPECIALISATION } from '../../../../graphql/specialisations';
import { CREATE_PERSON } from '../../../../graphql/persons';
import { Add, AddIcCallOutlined } from '@mui/icons-material';
import CustomDatePicker from '../../../components/Admin/Form/CustomDatePicker';
import { CREATE_PERSONINFORMATION } from '../../../../graphql/personInformations';


const validationSchema = yup.object({
	firstName: yup.string().required('Voornaam is verplicht'),
	lastName: yup.string().required('Familienaam is verplicht'),
	
});

interface createTeacherProps {
	
}

export default function createTeacher({}: createTeacherProps): ReactElement {
	const [date, setDate] = React.useState<Date | null>(null);

	return (
		<BasicContainer title="Nieuwe Docent" >
			<Dashboard title="Nieuwe Docent">
				<Box
					sx={{
						maxWidth: 'lg',
					}}
				>
					<Formik
						initialValues={{
							firstName: '',
							lastName: '',
							dob: '',
							quote: '',
							bio: ''
							// type: 'TEACHER',
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => { 
							setSubmitting(true);

							const submitPerson = async() => {
								// Create Teacher
								const { data, error } = await client.mutate({
								// const responseQueryPerson = await client.mutate({
									mutation: CREATE_PERSON,
									variables: {
										input: {
											firstName: values.firstName,
											lastName: values.lastName,
											type: 'TEACHER',
										}
									}
								});
								console.log('data......', data);
								// Person is
								// data.createPerson.id
								console.log('data ID......', data.createPerson.id);
								// return await data;
								// return data.createPerson.id;


								const { data2, error2 } = await client.mutate({
								// const responseQueryPerson = await client.mutate({
									mutation: CREATE_PERSONINFORMATION,
									variables: {
										input: {
											bio: values.bio,
											quote: values.quote,
											personId: data.createPerson.id
										}
									}
								});

								// REDIRECT
								// 	// Router.push(Router.pathname.split('/create')[0] );
							}

							// const responseQueryPerson = client.mutate({
							// 	mutation: CREATE_PERSON, 
							// 	variables: {
							// 		input: {
							// 			firstName: values.firstName,
							// 			lastName: values.lastName,
							// 			type: 'TEACHER',
							// 		}
							// 	}
							// });



							// if(responseQueryPerson) {
							// 	// setSubmitting(false);
							// 	console.log(responseQueryPerson.data);
							// 	// Router.push(Router.pathname.split('/create')[0] );
							// }
							// const personId =  submitPerson();
							// console.log('personId OUT...', personId);
							submitPerson();
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

								{/* <Box sx={{
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
								</Box> */}
								<Typography variant="h6"  component="div" sx={{   }}>
            				EXTRA INFO OPT - switch ?
          				</Typography>
								{/* <Fab color="primary" aria-label="add">
  <Add/>

</Fab> */}
<Box margin={1}>
									<Field
										component={TextField}
										name="quote"
										type="text"
										label="Quote"
										helperText="Quote over het leven of over de docent"
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
										component={TextField}
										name="bio"
										type="text"
										label="Bio"
										helperText="Kleine biografie over de docent"
										multiline
										
										sx={{
											width: '100%',
											// maxWidth: 'lg'
										}}
									/>
								</Box>

{/* <Box margin={1}>
									<Field
										component={TextField}
										name="dob"
										type="date"
										label="Geboortedatum"
										helperText=""
										// defaultValue="1969-04-20"
										InputLabelProps={{
											shrink: true,
										  }}
										sx={{
											width: '100%',
											// maxWidth: 'lg'
										}}
									/>
								</Box> */}
<Box margin={1}>
									<Field
										component={CustomDatePicker}
										name="dob"
										type="date"
										label="Geboortedatum"
										helperText=""
										// defaultValue="1969-04-20"
										InputLabelProps={{
											shrink: true,
										  }}
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
