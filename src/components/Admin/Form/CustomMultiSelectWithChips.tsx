import * as React from "react";
import { fieldToTextField, TextFieldProps } from "formik-mui";

import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { Person } from "../../../../interfaces";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ReactElement, useState } from "react";

interface CustomMultiSelectWithChipsProps {
  data: any[];
  props: TextFieldProps;
}

export default function CustomMultiSelectWithChips({
  data,
  ...props
}: CustomMultiSelectWithChipsProps): ReactElement {
  const {
    form: { setFieldValue },
    field: { name },
    label,
    sx,
    placeholder,
    labelProps,

    // extraData,
    // data,
  } = props;

  const checkBoxIconUnchecked = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIconChecked = <CheckBoxIcon fontSize="small" />;

  const onChange = React.useCallback(
    (event, newValue) => {
      setFieldValue(name, newValue);
    },
    [setFieldValue, name]
  );

  //   const labelProps = ["firstName", "lastName"];

  return (
    <Autocomplete
      {...props}
      multiple
      id="tags-standard"
      sx={sx}
      value={props.form.values[name]}
      options={data}
      onChange={onChange}
      getOptionLabel={(option: Person) =>
        // option.firstName + " " + option.lastName
        option[labelProps[0]] + " " + option[labelProps[1]]
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {console.log("props.....", props)}
          <Checkbox
            icon={checkBoxIconUnchecked}
            checkedIcon={checkedIconChecked}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {/* {option.firstName + " " + option.lastName} */}
          {option[labelProps[0]] + " - " + option[labelProps[1]]}
          {/* {option.firstName + " " + option.lastName} */}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          //   placeholder="Docent"

          placeholder={placeholder}
          //   placeholder="...."
          // variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
