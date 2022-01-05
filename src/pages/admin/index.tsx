import { NextPage } from "next";

// Query
import { GET_ALL_COURSES } from "../../../graphql/courses";
import { Course } from "../../../interfaces";
import client from "../../../apollo-client";


// Custom Imports
import BasicContainer from "../../components/Admin/style/BasicContainer";
import Dashboard from '../../components/Admin/Dashboard';
import DataGridContent from "../../components/Admin/DataGridContent";

// Variables
import { tableColumns } from "../../utils/constants";


interface AdminPanelProps {
	courses: Course[]
}

export default function AdminPanel({courses}: AdminPanelProps) {
    return (
		<BasicContainer title="Home" >
			<Dashboard title="Vakken">
				<>
					<p>
						Here comes an overview
					</p>
					<DataGridContent 
						data={courses}
						info={tableColumns.courses} 
					/>
				</>
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
