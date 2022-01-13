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
import { LearningLine } from '../../../../interfaces';
import Link from 'next/link';
import NavigationButton from '../../../components/Admin/NavigationButton';
import Router from 'next/router';

interface LearningLinesPageProps {
	learningLines: LearningLine[]
}

export default function LearningLinesPage({learningLines}: LearningLinesPageProps): ReactElement {
	return (
		<BasicContainer title="Leerlijnen" >
			<Dashboard title="Leerlijnen">
				<>
				<NavigationButton
					title='nieuwe leerlijn'
				/>
					<DataGridContent 
						data={learningLines}
						info={tableColumns.learningLines} 
					/>
				</>
			</Dashboard>
		</BasicContainer>
	)
}

// export async function getStaticProps() {
	export async function getServerSideProps() {
    const { data, error } = await client.query({
        query: GET_ALL_LEARNING_LINES
    });

    if (error) {
        console.log(error);
    }

    return {
        props: {
            learningLines: data.learningLines,
        },
    };
}
