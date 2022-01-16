import React, { ReactElement } from "react";

// Query
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_SPECIALISATION,
  GET_ALL_SPECIALISATIONS,
} from "../../../../graphql/specialisations";

// Custom Components
import BasicContainer from "../../../components/Admin/style/BasicContainer";
import Dashboard from "../../../components/Admin/Dashboard";
import DataGridContent from "../../../components/Admin/DataGridContent";
import CustomLoading from "../../../components/Admin/style/CustomLoading";
import NavigationButton from "../../../components/Admin/NavigationButton";

// Variabels
import { tableColumns } from "../../../utils/constants";
import { Button } from "@mui/material";

export default function SpecialisationsPage(): ReactElement {
  const [
    deleteRecord,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_SPECIALISATION);

  const { data, error, loading } = useQuery(GET_ALL_SPECIALISATIONS, {
    ssr: true,
  });

  //   const handleDelete = (id: number) => {
  //     deleteRecord({
  //       variables: {
  //         id,
  //       },
  //       refetchQueries: [{ query: GET_ALL_SPECIALISATIONS }],
  //     });
  //   };

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
                {/* <button onClick={() => handleDelete(51)}>TEST</button> */}
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
