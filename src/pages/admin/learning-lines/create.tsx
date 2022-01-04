import React, { ReactElement } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
	
}

export default function create({}: Props): ReactElement {
	return (
		<Box
		  sx={{
			width: 500,
			maxWidth: '100%',
			m: 10
		  }}
		>
		  <TextField fullWidth label="naam" id="name" />
		</Box>
	  );
}
