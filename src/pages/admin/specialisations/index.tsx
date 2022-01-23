import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import {
  DELETE_SPECIALISATION,
  GET_ALL_SPECIALISATIONS,
} from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import NavigationButton from "../../../components/Admin/NavigationButton";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function SpecialisationsPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_SPECIALISATIONS, {
    ssr: true,
  });

  return (
    <BasicContainer title="Afstudeerrichtingen">
      {loading ? (
        <CustomLoading />
      ) : (
        <>
          <NavigationButton title="nieuwe afstuderrichting" />
          <DataGridContent
            data={data?.specialisations}
            info={tableColumns.specialisations}
            deleteQuery={DELETE_SPECIALISATION}
            fetchAllQuery={GET_ALL_SPECIALISATIONS}
          />
        </>
      )}
    </BasicContainer>
  );
}
