import React, { ReactElement } from "react";

import Link from "next/link";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import { IconButton, ListItemIcon, Tooltip } from "@mui/material";

import {
  ModeEditOutlined,
  DeleteOutline,
  AddCircleOutline,
  PausePresentationOutlined,
} from "@mui/icons-material";

// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DELETE_LEARNING_LINE } from "../../../graphql/learningLines";
import client from "../../../apollo-client";
import Router from "next/router";
import { pathToArray } from "graphql/jsutils/Path";
import { DELETE_SPECIALISATION } from "../../../graphql/specialisations";
import { colors, fetchQueries } from "../../utils/constants";
// import DeleteRecord from './Form/DeleteRecord';

// import DeleteRecord from './Form/DeleteRecord';

interface DataGridContentProps {
  data: any[];
  info: any[];
}

// Delete queries
let deleteQueries: any = {
  specialisations: DELETE_SPECIALISATION,
};
deleteQueries["learning-lines"] = DELETE_LEARNING_LINE;

function deleteRecord(id: string, adminPath: string) {
  //   console.log("path....", adminPath);
  const query = deleteQueries[adminPath + ""];
  //   console.log("query....", query);
  // console.log('query....', deleteQueries[entity]);
  //   typeof id === "string" ? (id = parseInt(id)) : id;

  // console.log( Router.pathname.split('/admin/')[1]);

  const response = client.mutate({
    mutation: query,
    variables: {
      id: Number(id),
    },
    refetchQueries: [{ query: fetchQueries[adminPath] }],
  });
  // .then(() => {
  //   Router.push(`/admin/${adminPath}`);
  //   //   Router.reload(`/admin/${adminPath}`);
  //   //   Router.reload(window.location.pathname);
  // });

  //   if (response) {
  //   }
}

export default function DataGridContent({
  data,
  info,
}: DataGridContentProps): ReactElement {
  // DATA
  const rows: GridRowsProp = data.map((row: any, i) => {
    let rowData: any = {};
    info.forEach((element) => {
      let key = element.dataName;
      const val = row[element.dataName];

      rowData[key] = val;
    });
    console.log(rowData);
    return rowData;
  });

  // COLUMN NAMES
  let columns: GridColDef[] = info.map((column: any, i = 1) => {
    return {
      field: column.dataName,
      headerName: column.colName + "",
      // width: column.width,
      // width: 150
      // width: column.width || 'auto',
    };
  });

  // Add edit & delete to column names & icon + button on each row
  columns.push(
    {
      field: "edit",
      headerName: "bewerk",
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`${Router.pathname}/${params.id}/edit`}>
          <Tooltip
            title="Bewerk"
            placement="left"
            sx={{
              "&:hover": {
                color: colors.edit,
                backgroundColor: colors.edit_bg,
              },
            }}
          >
            <IconButton>
              <ModeEditOutlined />
            </IconButton>
          </Tooltip>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "wis",
      renderCell: (params: GridRenderCellParams) => (
        //TODO: CHANGE ROUTES FOR EDIT AND DELETE
        // <Link href={"/admin"}>
        <Tooltip
          title="Verwijder"
          placement="left"
          sx={{
            "&:hover": {
              color: colors.delete,
              backgroundColor: colors.delete_bg,
            },
          }}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              deleteRecord(params.id, Router.pathname.split("/admin/")[1]);
              // Router.push('/admin/learning-lines')
            }}
          >
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      ),
    }
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      // checkboxSelection
      disableSelectionOnClick
      sortModel={[{ field: "id", sort: "desc" }]}
      sx={{
        flexGrow: 1,
        height: 600,
      }}
    />
  );
}
