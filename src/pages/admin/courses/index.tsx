import React, { ReactElement } from 'react'

// Query
import { GET_ALL_COURSES } from '../../../../graphql/courses';

// Custom Components
import client from '../../../../apollo-client';
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'

// Variabels
import { tableColumns } from '../../../utils/constants';
import { Course } from '../../../../interfaces';

interface CoursesPageProps {
	courses: Course[]
}

export default function CoursesPage({courses}: CoursesPageProps): ReactElement {
	return (
		<BasicContainer title="Vakken" >
			<Dashboard title="Vakken">
				<DataGridContent 
					data={courses}
					info={tableColumns.courses} 
				/>
			</Dashboard>
		</BasicContainer>	
	)
}

export async function getStaticProps() {
    const { data, error } = await client.query({
        query: GET_ALL_COURSES
    });

    if (error) {
        console.log(error);
    }

    return {
        props: {
            courses: data.courses,
        },
    };
}
