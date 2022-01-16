import React, { ReactElement } from "react";

import { IconButton, ListItemIcon, Tooltip } from "@mui/material";

import { ModeEditOutlined, DeleteOutline } from "@mui/icons-material";

import { colors } from "../../../utils/constants";

interface Props {}

export function EditButton({}: Props): ReactElement {
  return (
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
      <IconButton className="edit-button">
        <ModeEditOutlined />
      </IconButton>
    </Tooltip>
  );
}

export function DeleteButton({}: Props): ReactElement {
  return (
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
      <IconButton className="delete-button">
        <DeleteOutline />
      </IconButton>
    </Tooltip>
  );
}
