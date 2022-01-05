import React, { ReactElement } from 'react'
import * as yup from 'yup'

import Box from '@mui/material/Box';
import Router from 'next/router';

// import TextField from '@mui/material/TextField';
// import { TextField } from 'formik-mui'


import { Field, Form, Formik } from 'formik';


import { Button, TextField } from '@mui/material'
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
	// set rules for # color
	color: yup.string().required('Kleur is verplicht'),
})

const createLearningLine = async (values: any, actions: any) => {
	console.log('TES TEST');

	const { name, color } = values;
	const learningLine = {
		name,
		color,
	}
	try {
		const { data } = await client.mutate({
			mutation: CREATE_LEARNING_LINE,
			variables: {
				learningLine,
			},
		})
		console.log(data);
		// if(errorData) console.log('ERRORRRRR...', errorData);
	} catch (error) {
		console.log(error);
	}
}

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

				setTimeout(() => {
					setSubmitting(false);
					alert(JSON.stringify(values, null, 2));
				}, 500);



				// setSubmitting(true);

				console.log('data.....', values);
				console.log('start submitting form.....');
				alert(JSON.stringify(values, null, 2));
				// const responseQUERY = client.mutate({
				// 	// mutation: CREATE_LEARNING_LINE, 
				// 	mutation: CREATE_LEARNING_LINE_NEW, 
				// 	variables: {
				// 		 input: {
				// 			 name: values.name,
				// 			 color: values.color,

				// 		 }
						
				// 	}
				// });

				// createLearningLine(values, {});
				// console.log('response....', responseQUERY)
				console.log('end submitting form.....');


				// setSubmitting(false);
				// Router.push('/admin/learning-lines');
			}}
		>
			{/* {({values, submitForm, resetForm, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => ( */}
			{({values, submitForm, isSubmitting}) => (
				<Form>
					<Box margin={1}>
						<Field
							// required
							component={TextField}
							name="name"
							type="text"
							label="Naam"
							// helperText="Naam van de leerlijn"
							// fullWidth
							/>
					</Box>
					<Box margin={1}>
						<Field
							// required
							component={TextField}
							name="color"
							type="text"
							label="Kleur"
							// helperText="Kleur van de leerlijn"
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
		// <Box
		//   sx={{
		// 	width: 500,
		// 	maxWidth: '100%',
		// 	m: 10
		//   }}
		// >
		//   <TextField fullWidth label="naam" id="name" />
		// </Box>
	  );
}
