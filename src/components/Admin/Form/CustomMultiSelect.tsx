import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
	FormHelperText
} from '@mui/material';

import React, { ReactElement, useState } from 'react'

import {fieldToSelect, SelectProps } from 'formik-mui';



interface CustomMultiSelectProps {
	// data: any[],
	// label: string,
	props: SelectProps
}

export default function CustomMultiSelect(props: SelectProps): ReactElement {
	const {
		// form: {setFieldValue},
		// field: {data, label}
		form: {setFieldValue},
		data,
		label,
		sx,
		helperText,
		required,
		field: {name},
		extraData
	} = props;
	const [value, setValue] = useState('');

	// const handleChange = (event: SelectChangeEvent) => {
	//   setValue(event.target.value);
	//   [setFieldValue, name]
	// };

	const onChange = React.useCallback(
		(event) => {
		  const {value} = event.target;
		  setFieldValue(name, value ? value : '');
		setValue(event.target.value);
		},
		[setFieldValue, name]
	  );

	return (
		<div>
		<FormControl sx={{  minWidth: 80, ...sx }} >
		  <InputLabel id="demo-simple-select-autowidth-label">{ label }</InputLabel>
		  <Select
			labelId="demo-simple-select-autowidth-label"
			id="demo-simple-select-autowidth"
			value={value}
			onChange={onChange}
			autoWidth
			label={label}
			{ ...required }
			
			
			// {...fieldToSelect(props)}
			// sx={sx}
		  >
			{/* <MenuItem value="">
			  <em>None</em>
			</MenuItem> */}

			{data.map((item: any) => (
				<MenuItem key={item.id} value={item.id}>{item.name}{ extraData ? ` - ${item[extraData]}` : '' }</MenuItem>
			))}

			{/* <MenuItem value={10}>Twenty</MenuItem>
			<MenuItem value={21}>Twenty one</MenuItem>
			<MenuItem value={22}>Twenty one and a half</MenuItem> */}
		  </Select>
		  <FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	  </div>
	)
}
