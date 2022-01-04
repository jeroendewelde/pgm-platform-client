import React, { ReactElement } from 'react'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { sizing } from '@mui/system';

import { Container, ListItem, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

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
		// rowData['delete'] = 'delete';
		// rowData['edit'] = 'edit';
		return rowData;
	});

	// COLUMN NAMES
	let columns: GridColDef[] = info.map((column: any, i= 1) => {
		return {
			field: column.dataName,
			headerName: column.colName + '',
			// width: column.width,
			// width: 150
			// width: column.width || 'auto',
		}
	});

	columns.push({
		field: 'edit',
		headerName: 'bewerk',
		renderCell: (params: GridRenderCellParams) => (
			
			<Link href={'/admin'} >
				

				<ListItemIcon sx={{
					cursor: 'pointer',
				}}>

				<ModeEditOutlinedIcon />
				</ListItemIcon>
				
			</Link>
				
		)
	}, {
		field: 'delete',
		headerName: 'wis',
		renderCell: (params: GridRenderCellParams) => (
			
			<Link href={'/admin'} >
				

				<ListItemIcon sx={{
					cursor: 'pointer',
				}}>

<DeleteOutlineIcon />
				</ListItemIcon>
				
			</Link>
		)
	})


	return (
	

				<DataGrid 
					rows={rows} 
					columns={columns} 
					// checkboxSelection
					disableSelectionOnClick

					sx={{  
						flexGrow: 1,
						height: 600
					}}/>
			

	)
}
