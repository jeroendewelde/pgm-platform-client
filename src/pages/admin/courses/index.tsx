import React, { ReactElement } from "react";

// Query
import { GET_ALL_COURSES } from "../../../../graphql/courses";

// Custom Components
import client from "../../../../apollo-client";
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";

// Variabels
import { tableColumns } from "../../../utils/constants";
import { Course } from "../../../../interfaces";

import NavigationButton from "../../../components/Admin/NavigationButton";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

// interface CoursesPageProps {
//   courses: Course[];
// }

export default function CoursesPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_COURSES, {
    ssr: true,
  });

  return (
    <BasicContainer title="Vakken">
      <Dashboard title="Vakken">
        <>
          {loading ? (
            <CustomLoading />
          ) : (
            <>
              <NavigationButton title="nieuw vak" />
              <DataGridContent
                data={data.courses}
                info={tableColumns.courses}
              />
            </>
          )}
        </>
      </Dashboard>
    </BasicContainer>
  );
}

// export async function getStaticProps() {
//     const { data, error } = await client.query({
//         query: GET_ALL_COURSES
//     });

//     if (error) {
//         console.log(error);
//     }

//     return {
//         props: {
//             courses: data.courses,
//         },
//     };
// }
