import React, { ReactElement } from 'react'

// Query
import { GET_ALL_COURSES } from '../../../../graphql/courses';

// Custom Components
import client from '../../../../apollo-client';
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'
import DataGridContent from '../../../components/Admin/DataGridContent';

// Variabels
import { tableColumns } from '../../../utils/constants';
import { Course, Person } from '../../../../interfaces';
import { GET_ALL_SPECIALISATIONS } from '../../../../graphql/specialisations';
import { GET_ALL_STUDENTS, GET_ALL_TEACHERS } from '../../../../graphql/persons';

interface PersonsPageProps {
	students: Person[],
	teachers: Person[]
}

export default function PersonsPage({students, teachers}: PersonsPageProps): ReactElement {
	return (
		<>
			<BasicContainer title="Docenten" >
				<Dashboard title="Docenten">
					<DataGridContent 
						data={teachers}
						info={tableColumns.teachers} 
					/>
				</Dashboard>
			</BasicContainer>
			<BasicContainer title="Studenten" >
				<Dashboard title="Studenten">
					<DataGridContent 
						data={students}
						info={tableColumns.students} 
					/>
				</Dashboard>
			</BasicContainer>
		</>
	)
}

export async function getStaticProps() {
	const queryMultiple = async() => {
		const query_Students =  await client.query({
			query: GET_ALL_STUDENTS
		});
		
		const query_Teachers = await client.query({
			query: GET_ALL_TEACHERS
		});

		return [query_Students, query_Teachers];
	}

	const [query_Students, query_Teachers] = await queryMultiple();
	const { data, error, loading } = query_Students;
	const { data: data_Teachers, error: error_Teachers, loading: loading_Teachers } = query_Teachers;

    return {
		props: {
			students: data.students,
			teachers: data_Teachers.teachers
		},
	}
}
