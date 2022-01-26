import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FormHelperText } from "@mui/material";

import React, { ReactElement, useEffect, useState } from "react";

export default function CustomSingleSelectForEnum(props: any): ReactElement {
  const {
    form: { setFieldValue, values },
    data,
    label,
    sx,
    helperText,
    required,
    field: { name },
    extraData,
    value: valueFromData,
  } = props;

  const [value, setValue] = useState("");

  useEffect(() => {
    if (valueFromData) {
      setValue(valueFromData);
    }
  }, []);

  const onChange = React.useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value ? value : "");
      setValue(event.target.value);
    },
    [setFieldValue, name]
  );

  return (
    <div>
      <FormControl sx={{ minWidth: 80, ...sx }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          autoWidth
          label={label}
          {...required}
        >
          {data.map((item: any) => (
            <MenuItem key={item.name} value={item.name}>
              <span
                style={{
                  textTransform: "lowercase",
                }}
              >
                {item.name}
              </span>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
