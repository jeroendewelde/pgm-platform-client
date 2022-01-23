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
    form: { setFieldValue, values },
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

  const getLabelContent = (item: any) => {
    let labelContent = "";
    if (labelProps.length === 3) {
      labelContent = `${item[labelProps[0]]} ${item[labelProps[1]]} ( ${
        item[labelProps[2]]
      } )`;
    }

    if (labelProps.length === 2) {
      labelContent = `${item[labelProps[0]]} - ${item[labelProps[1]]}`;
    }

    if (labelProps.length === 1) {
      labelContent = item[labelProps[0]];
    }
    return labelContent;
  };

  return (
    <Autocomplete
      {...props}
      multiple
      id="tags-standard"
      sx={sx}
      defaultValue={values[name]}
      options={data}
      onChange={onChange}
      getOptionLabel={(option: any) =>
        option[labelProps[0]] + " " + option[labelProps[1]]
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={checkBoxIconUnchecked}
            checkedIcon={checkedIconChecked}
            style={{ marginRight: 8 }}
            // checked={selected}
            checked={values[name].some(
              (element: Person) => element.id === option.id
            )}
            // checked={values[name].inclues(option)}
            // checked={props.form.values[name]}
            // checked={props.form.values[name].includes(option)}
          />
          {/* {option.firstName + " " + option.lastName} */}
          {/* {labelProps.length == 2
            ? option[labelProps[0]] + " - " + option[labelProps[1]]
            : ""}

          {labelProps.length == 3
            ? option[labelProps[0]] +
              " " +
              option[labelProps[1]] +
              " ( " +
              option[labelProps[2]] +
              " ) "
            : ""} */}
          {getLabelContent(option)}

          {/* //   {option[labelProps[0]] + " - " + option[labelProps[1]]} */}
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
