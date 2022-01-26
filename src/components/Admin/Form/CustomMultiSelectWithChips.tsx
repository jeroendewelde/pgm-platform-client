import * as React from "react";

import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { Person } from "../../../../interfaces";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ReactElement } from "react";

export default function CustomMultiSelectWithChips({
  data,
  ...props
}: any): ReactElement {
  const {
    form: { setFieldValue, values },
    field: { name },
    label,
    sx,
    placeholder,
    labelProps,
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
      renderOption={(props, option: any, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={checkBoxIconUnchecked}
            checkedIcon={checkedIconChecked}
            style={{ marginRight: 8 }}
            checked={values[name].some(
              (element: Person) => element.id === option.id
            )}
          />
          {getLabelContent(option)}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
          fullWidth
        />
      )}
    />
  );
}
