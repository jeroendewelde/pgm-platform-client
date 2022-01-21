import React, { ReactElement } from "react";

// Query
import { useQuery } from "@apollo/client";
import {
  DELETE_COMPANY,
  GET_ALL_COMPANIES,
} from "../../../../graphql/companies";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import NavigationButton from "../../../components/Admin/NavigationButton";

// Variabels
import { tableColumns } from "../../../utils/constants";

export default function CompaniesPage(): ReactElement {
  const { data, error, loading } = useQuery(GET_ALL_COMPANIES, {
    ssr: true,
  });

  return (
    <BasicContainer title="Leerbedrijven">
      <Dashboard title="Leerbedrijven">
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <NavigationButton title="nieuw leerbedrijf" />
            <DataGridContent
              data={data.companies}
              info={tableColumns.companies}
              deleteQuery={DELETE_COMPANY}
              fetchAllQuery={GET_ALL_COMPANIES}
            />
          </>
        )}
      </Dashboard>
    </BasicContainer>
  );
}
