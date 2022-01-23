import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import { DELETE_COURSE, GET_ALL_COURSES } from "../../../../graphql/courses";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import DataGridContent from "../../../components/Admin/DataGridContent";
import NavigationButton from "../../../components/Admin/NavigationButton";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function CoursesPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_COURSES, {
    ssr: true,
  });

  return (
    <BasicContainer title="Vakken">
      {loading ? (
        <CustomLoading />
      ) : (
        <>
          <NavigationButton title="nieuw vak" />
          <DataGridContent
            data={data.courses}
            info={tableColumns.courses}
            deleteQuery={DELETE_COURSE}
            fetchAllQuery={GET_ALL_COURSES}
          />
        </>
      )}
    </BasicContainer>
  );
}
