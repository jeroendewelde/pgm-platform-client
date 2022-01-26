import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FormHelperText } from "@mui/material";

import React, { ReactElement, useEffect, useState } from "react";

import { fieldToSelect, SelectProps } from "formik-mui";

interface CustomSingleSelectForEnumProps {
  // data: any[],
  // label: string,
  props: SelectProps;
}

export default function CustomSingleSelectForEnum(
  props: SelectProps
): ReactElement {
  const {
    // form: {setFieldValue},
    // field: {data, label}
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
  //   const [value, setValue] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (valueFromData) {
      setValue(valueFromData);
    }
    // if (values[name]) {
    //   setValue(values[name]);
    // }
  }, []);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setValue(event.target.value);
  //   [setFieldValue, name]
  // };

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
          //   value="GITHUB"
          //   defaultValue={value}
          onChange={onChange}
          autoWidth
          label={label}
          {...required}

          // {...fieldToSelect(props)}
          // sx={sx}
        >
          {/* <MenuItem value="">
			  <em>None</em>
			</MenuItem> */}

          {data.map((item: any) => (
            <MenuItem
              key={item.name}
              //   {item.name == "GITHUB" ? selected : ''}

              value={item.name}
            >
              {/* {"...." + value + "...."} */}
              <span
                style={{
                  textTransform: "lowercase",
                }}
              >
                {item.name}
              </span>

              {/* {item.name === value ? "TRUE" : "FALSE"} */}
            </MenuItem>
          ))}

          {/* <MenuItem value={10}>Twenty</MenuItem>
			<MenuItem value={21}>Twenty one</MenuItem>
			<MenuItem value={22}>Twenty one and a half</MenuItem> */}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
