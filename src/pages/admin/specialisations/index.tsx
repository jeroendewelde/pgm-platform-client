import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import { GET_ALL_SPECIALISATIONS } from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";

// Variabels
import { tableColumns } from "../../../utils/constants";
import NavigationButton from "../../../components/Admin/NavigationButton";

export default function SpecialisationsPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_SPECIALISATIONS, {
    ssr: true,
  });

  return (
    <>
      <BasicContainer title="Afstudeerrichtingen">
        <Dashboard title="Afstudeerrichtingen">
          <>
            {loading ? (
              <CustomLoading />
            ) : (
              <>
                <NavigationButton title="nieuwe afstuderrichting" />
                <DataGridContent
                  data={data.specialisations}
                  info={tableColumns.specialisations}
                />
              </>
            )}
          </>
        </Dashboard>
      </BasicContainer>
    </>
  );
}
