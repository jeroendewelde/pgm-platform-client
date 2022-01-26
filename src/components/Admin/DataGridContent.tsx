import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Material UI Components
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

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
  const router = useRouter();
  const [
    deleteRecord,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useMutation(deleteQuery, {});

  // Add Edit & Delete button for each row
  info.push(
    {
      field: "edit",
      headerName: "bewerk",
      renderCell: (params: GridRenderCellParams) => (
        <EditButton params={params} handleClick={handleClickEdit} />
      ),
    },
    {
      field: "delete",
      headerName: "wis",
      width: 25,
      renderCell: (params: GridRenderCellParams) => (
        <DeleteButton params={params} handleClick={handleClickDelete} />
      ),
    }
  );

  const handleClickEdit = (id: number) => {
    window.location.href = `${router.pathname}/${id}/edit`;
  };

  const handleClickDelete = (id: number) => {
    deleteRecord({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: fetchAllQuery }],
      notifyOnNetworkStatusChange: true,
    });
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
            disableSelectionOnClick
            sortModel={[{ field: "id", sort: "desc" }]}
            rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
            sx={{
              width: "100%",
            }}
          />
        </>
      )}
    </>
  );
}
