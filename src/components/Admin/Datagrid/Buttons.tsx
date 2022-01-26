import React, { ReactElement } from "react";
import { useRouter } from "next/router";

// Material UI Components
import { IconButton, Tooltip } from "@mui/material";
import { ModeEditOutlined, DeleteOutline } from "@mui/icons-material";
import { GridRenderCellParams } from "@mui/x-data-grid";

// Custom imports
import { colors } from "../../../utils/constants";

interface EditButtonProps {
  params: GridRenderCellParams;
  handleClick: (id: number) => void;
}

export function EditButton({
  params,
  handleClick,
}: EditButtonProps): ReactElement {
  return (
    <Tooltip title="Bewerk" placement="left">
      <IconButton
        className="edit-button"
        sx={{
          "&:hover": {
            color: colors.edit,
            backgroundColor: colors.edit_bg,
          },
        }}
        onClick={() => handleClick(Number(params.id))}
      >
        <ModeEditOutlined />
      </IconButton>
    </Tooltip>
  );
}

interface DeleteButtonprops {
  params: GridRenderCellParams;
  handleClick: (id: number) => void;
}

export function DeleteButton({
  params,
  handleClick,
}: DeleteButtonprops): ReactElement {
  const router = useRouter();

  return (
    <Tooltip title="Verwijder" placement="left">
      <IconButton
        className="delete-button"
        sx={{
          "&:hover": {
            color: colors.delete,
            backgroundColor: colors.delete_bg,
          },
        }}
        onClick={() => handleClick(Number(params.id))}
      >
        <DeleteOutline />
      </IconButton>
    </Tooltip>
  );
}
