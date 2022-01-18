import * as React from "react";
import { fieldToTextField, TextFieldProps } from "formik-mui";

import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { Person } from "../../../../interfaces";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ReactElement, useState } from "react";

const teachers = [
  {
    id: 1,
    firstName: "voornaam",
    lastName: "familienaam",
    type: "TEACHER",
  },
  {
    id: 2,
    firstName: "voornaam",
    lastName: "familienaam",
    type: "TEACHER",
  },
  {
    id: 3,
    firstName: "voornaam",
    lastName: "familienaam",
    type: "TEACHER",
  },
];
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
    // extraData,
    // data,
  } = props;

  const checkBoxIconUnchecked = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIconChecked = <CheckBoxIcon fontSize="small" />;
  console.log(props);
  console.log(props.form.values[name]);
  //   setFieldValue(name, props.form.values[name]);

  // Match ids from course with teachers
  // const teachersFromData = extraData.map(extra => data[extra.id])
  //   const teachersFromData = extraData.map((extra: Person) =>
  //     data.find((t) => t.id === extra.id)
  //   );
  //   setFieldValue(name, [...teachersFromData]);

  //   console.log("------teachersFromData", teachersFromData);
  //   setFieldValue(name, [...teachersFromData]);

  const onChange = React.useCallback(
    (event, newValue) => {
      //   const { value } = event.target;
      //   setFieldValue(name, value ? value.toUpperCase() : "");
      //   setFieldValue(name, value ? value : []);
      setFieldValue(name, newValue);
    },
    [setFieldValue, name]
  );

  //   React.useEffect(() => {
  //     setFieldValue(name, props.form.values[name]);
  //   }, []);

  //   React.useEffect(() => {
  // 	const teachersFromData = extraData.map((extra: Person) =>
  // 	data.find((t) => t.id === extra.id)

  //   }, []);

  return (
    // <div>TT</div>
    //   <TextField {...fieldToTextField(props)} onChange={onChange} />
    <Autocomplete
      //   {...fieldToTextField(props)}
      {...props}
      multiple
      id="tags-standard"
      sx={sx}
      value={props.form.values[name]}
      //   value={props.values.teachers}
      //   value={props.form.values[name]}
      //   value={teachersFromData}
      //   options={dataTeachers.teachers}
      //   options={teachers}
      options={data}
      onChange={onChange}
      getOptionLabel={(option: Person) =>
        option.firstName + " " + option.lastName
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
          {option.firstName + " " + option.lastName}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder="Docent"
          // variant="outlined"
          fullWidth
          // helperText="Docenten die deze vakken leren"
        />
      )}
    />
  );
}
