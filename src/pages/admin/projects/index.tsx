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
import { Course } from '../../../../interfaces';

interface ProjectsPageProps {
	courses: Course[]
}

export default function ProjectsPage({courses}: ProjectsPageProps): ReactElement {
	return (
		<>
			<BasicContainer title="Projecten" >
				<Dashboard title="Projecten">
					<DataGridContent 
						data={courses}
						info={tableColumns.courses} 
					/>
				</Dashboard>
			</BasicContainer>
		</>
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
