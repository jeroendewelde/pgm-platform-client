import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FormHelperText } from "@mui/material";

import React, { ReactElement, useState } from "react";

import { fieldToSelect, SelectProps } from "formik-mui";

export default function CustomSingleSelect(props: any): ReactElement {
  const {
    form: { setFieldValue, touched, errors, values },
    data,
    label,
    sx,
    helperText,
    required,
    field: { name },
    extraData,
    value: valueFromData,
    labelProps,
  } = props;
  const [value, setValue] = useState(values[name] || "");

  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value ? value : "");
      setValue(event.target.value);
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
    <FormControl
      required={required}
      sx={{ minWidth: 80, ...sx }}
      error={touched[name] && errors[name]}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {data.map((item: any) => (
          <MenuItem key={item.id} value={item.id}>
            {/* {!labelProps && !extraData ? item.name : ""}
              {labelProps
                ? item[labelProps[0]] +
                  " " +
                  item[labelProps[1]] +
                  " ( " +
                  item[labelProps[2]] +
                  " ) "
                : ""}
              {extraData && item.name + " ( " + item[extraData] + " ) "} */}
            {/* {labelContent} */}
            {getLabelContent(item)}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>
        {touched[name] && errors[name] ? errors[name] : helperText}
        {/* {!errors[name] && helperText} */}
      </FormHelperText>
    </FormControl>
  );
}
