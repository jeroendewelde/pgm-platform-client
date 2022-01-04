import React, { ReactElement } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { sizing } from '@mui/system';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

interface Props {
	data: any[],
	info: any[],
}

export default function DataGridContent({data, info}: Props): ReactElement {
	
	// DATA
	const rows: GridRowsProp = data.map((row: any, i) => {
		let rowData: any = {};
		info.forEach(element => {
			let key =   element.dataName;
			const val = row[element.dataName];

			rowData[key] =  val;			
		});

		return rowData;
	});

	// COLUMN NAMES
	const columns: GridColDef[] = info.map((column: any, i= 1) => {
		return {
			field: column.dataName,
			headerName: column.colName + '',
			// width: column.width,
			// width: 150
			// width: column.width || 'auto',
		}
	});

	return (
	

				<DataGrid rows={rows} columns={columns} sx={{  
					flexGrow: 1,
					height: 600
					}}/>
			

	)
}
