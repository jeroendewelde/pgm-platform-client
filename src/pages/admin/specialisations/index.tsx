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
import { GET_ALL_SPECIALISATIONS } from '../../../../graphql/specialisations';

interface SpecialisationsPageProps {
	courses: Course[]
}

export default function SpecialisationsPage({specialisations}: SpecialisationsPageProps): ReactElement {
	return (
		<>
			<BasicContainer title="Afstudeerrichtingen" >
				<Dashboard title="Afstudeerrichtingen">
					<DataGridContent 
						data={specialisations}
						info={tableColumns.specialisations} 
					/>
				</Dashboard>
			</BasicContainer>
		</>
	)
}

export async function getStaticProps() {
    const { data, error } = await client.query({
        query: GET_ALL_SPECIALISATIONS
    });

    if (error) {
        console.log(error);
    }

    return {
        props: {
            specialisations: data.specialisations,
        },
    };
}
