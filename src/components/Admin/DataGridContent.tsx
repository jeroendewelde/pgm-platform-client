import React, { ReactElement, MouseEvent } from "react";
import Router from "next/router";

// Material UI Components
import {
  DataGrid,
  GridRenderCellParams,
  GridCellParams,
  MuiEvent,
} from "@mui/x-data-grid";

// Graphql
import { DocumentNode, useMutation } from "@apollo/client";

// Custom Components
import CustomLoading from "./style/CustomLoading";
import { EditButton, DeleteButton } from "./Datagrid/Buttons";

interface DataGridContentProps {
  data: any[];
  info: any[];
  deleteQuery: DocumentNode;
  fetchAllQuery: DocumentNode;
}

export default function DataGridContent({
  data,
  info,
  deleteQuery,
  fetchAllQuery,
}: DataGridContentProps): ReactElement {
  const [
    deleteRecord,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(deleteQuery, {
    refetchQueries: [{ query: fetchAllQuery }],
    notifyOnNetworkStatusChange: true,
  });

  // Add Edit & Delete button for each row
  info.push(
    {
      field: "edit",
      headerName: "bewerk",
      renderCell: (params: GridRenderCellParams) => <EditButton />,
    },
    {
      field: "delete",
      headerName: "wis",
      renderCell: (params: GridRenderCellParams) => <DeleteButton />,
    }
  );

  const handleClick = (params: GridCellParams, event: MuiEvent<MouseEvent>) => {
    if (
      params.field === "delete" &&
      (event.target.classList.contains("delete-button") ||
        event.target.parentNode.classList.contains("delete-button"))
    ) {
      deleteRecord({
        variables: {
          id: Number(params.id),
        },
      });
    }

    if (
      params.field === "edit" &&
      (event.target.classList.contains("edit-button") ||
        event.target.parentNode.classList.contains("edit-button"))
    ) {
      Router.push(`${Router.pathname}/${params.id}/edit`);
    }
  };

  return (
    <>
      {loadingDelete ? (
        <CustomLoading />
      ) : (
        <>
          <DataGrid
            rows={data}
            columns={info}
            // checkboxSelection
            disableSelectionOnClick
            sortModel={[{ field: "id", sort: "desc" }]}
            sx={{
              flexGrow: 1,
              height: 600,
            }}
            onCellClick={handleClick}
          />
        </>
      )}
    </>
  );
}
