import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import { DELETE_PERSON, GET_ALL_STUDENTS } from "../../../../graphql/persons";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import NavigationButton from "../../../components/Admin/NavigationButton";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function StudentsPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_STUDENTS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Studenten">
      {loading ? (
        <CustomLoading />
      ) : (
        <>
          <NavigationButton title="nieuwe student" />
          <DataGridContent
            data={data.students}
            info={tableColumns.students}
            deleteQuery={DELETE_PERSON}
            fetchAllQuery={GET_ALL_STUDENTS}
          />
        </>
      )}
    </BasicContainer>
  );
}
