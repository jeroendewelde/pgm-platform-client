import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import {
  DELETE_LEARNING_LINE,
  GET_ALL_LEARNING_LINES,
} from "../../../../graphql/learningLines";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import NavigationButton from "../../../components/Admin/NavigationButton";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function LearningLinesPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_LEARNING_LINES, {
    ssr: true,
  });

  return (
    <BasicContainer title="Leerlijnen">
      <Dashboard title="Leerlijnen">
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <NavigationButton title="nieuwe leerlijn" />
            <DataGridContent
              data={data.learningLines}
              info={tableColumns.learningLines}
              deleteQuery={DELETE_LEARNING_LINE}
              fetchAllQuery={GET_ALL_LEARNING_LINES}
            />
          </>
        )}
      </Dashboard>
    </BasicContainer>
  );
}
