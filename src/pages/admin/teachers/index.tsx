import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import { DELETE_PERSON, GET_ALL_TEACHERS } from "../../../../graphql/persons";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import NavigationButton from "../../../components/Admin/NavigationButton";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function TeachersPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_TEACHERS, {
    ssr: true,
    errorPolicy: "all",
  });

  return (
    <BasicContainer title="Docenten">
      <Dashboard title="Docenten">
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <NavigationButton title="nieuwe docent" />
            <DataGridContent
              data={data.teachers}
              info={tableColumns.teachers}
              deleteQuery={DELETE_PERSON}
              fetchAllQuery={GET_ALL_TEACHERS}
            />
          </>
        )}
      </Dashboard>
    </BasicContainer>
  );
}
