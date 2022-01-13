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
import { Company, Course } from '../../../../interfaces';
import { GET_ALL_COMPANIES } from '../../../../graphql/companies';

interface CompaniesPageProps {
	companies: Company[]
}

export default function CompaniesPage({companies}: CompaniesPageProps): ReactElement {
	return (
		<BasicContainer title="Bedrijven" >
			<Dashboard title="Bedrijven">
				<DataGridContent 
					data={companies}
					info={tableColumns.companies} 
				/>
			</Dashboard>
		</BasicContainer>	
	)
}

export async function getStaticProps() {
    const { data, error } = await client.query({
        query: GET_ALL_COMPANIES
    });

    if (error) {
        console.log(error);
    }

    return {
        props: {
            companies: data.companies,
        },
    };
}
