import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import { DELETE_PROJECT, GET_ALL_PROJECTS } from "../../../../graphql/projects";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import NavigationButton from "../../../components/Admin/NavigationButton";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function ProjectsPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_PROJECTS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Projecten">
      <Dashboard title="Projecten">
        <>
          {loading ? (
            <CustomLoading />
          ) : (
            <>
              <NavigationButton title="nieuw project" />
              <DataGridContent
                data={data.projects}
                info={tableColumns.projects}
                deleteQuery={DELETE_PROJECT}
                fetchAllQuery={GET_ALL_PROJECTS}
              />
            </>
          )}
        </>
      </Dashboard>
    </BasicContainer>
  );
}
