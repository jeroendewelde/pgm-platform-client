import React, { ReactElement } from 'react'

// Query
import { GET_ALL_LEARNING_LINES } from '../../../../graphql/learningLines';
import client from '../../../../apollo-client';

// Custom Components
import BasicContainer from '../../../components/Admin/style/BasicContainer';
import Dashboard from '../../../components/Admin/Dashboard'
import DataGridContent from '../../../components/Admin/DataGridContent';

// Variabels
import { tableColumns } from '../../../utils/constants';
import { LearningLine, Person } from '../../../../interfaces';
import Link from 'next/link';
import NavigationButton from '../../../components/Admin/NavigationButton';
import Router from 'next/router';
import { GET_ALL_TEACHERS } from '../../../../graphql/persons';

interface TeachersPageProps {
	teachers: Person[]
}

export default function TeachersPage({teachers}: TeachersPageProps): ReactElement {
	return (
		<BasicContainer title="Docenten" >
			<Dashboard title="Docenten">
				<>
				<NavigationButton
					title='nieuwe docent'
				/>
					<DataGridContent 
						data={teachers}
						info={tableColumns.teachers} 
					/>
				</>
			</Dashboard>
		</BasicContainer>
	)
}

// export async function getStaticProps() {
	export async function getServerSideProps() {
    const { data, error } = await client.query({
        query: GET_ALL_TEACHERS
    });

    if (error) {
        console.log(error);
    }

    return {
        props: {
            teachers: data.teachers,
        },
    };
}
