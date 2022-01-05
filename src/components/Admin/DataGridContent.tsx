import React, { ReactElement } from 'react'

import Link from 'next/link';

import { 
	DataGrid, 
	GridRowsProp, 
	GridColDef, 
	GridRenderCellParams 
} from '@mui/x-data-grid';

import { ListItemIcon } from '@mui/material';

import {
	ModeEditOutlined,
	DeleteOutline,
} from '@mui/icons-material'

interface DataGridContentProps {
	data: any[],
	info: any[],
}

export default function DataGridContent({data, info}: DataGridContentProps): ReactElement {
	
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
	let columns: GridColDef[] = info.map((column: any, i= 1) => {
		return {
			field: column.dataName,
			headerName: column.colName + '',
			// width: column.width,
			// width: 150
			// width: column.width || 'auto',
		}
	});

	// Add edit & delete to column names & icon + button on each row
	columns.push(
		{
			field: 'edit',
			headerName: 'bewerk',
			renderCell: (params: GridRenderCellParams) => (
				//TODO: CHANGE ROUTES FOR EDIT AND DELETE
				<Link href={'/admin'} >
					<ListItemIcon 
						sx={{
							cursor: 'pointer',
						}}
					>
						<ModeEditOutlined />
					</ListItemIcon>
				</Link>
			)
		}, 
		{
			field: 'delete',
			headerName: 'wis',
			renderCell: (params: GridRenderCellParams) => (
				//TODO: CHANGE ROUTES FOR EDIT AND DELETE
				<Link href={'/admin'}>
					<ListItemIcon 
						sx={{
							cursor: 'pointer',
					}}
				>
					<DeleteOutline />
				</ListItemIcon>
			</Link>
		)}
	);


	return (
		<DataGrid 
			rows={rows} 
			columns={columns} 
			// checkboxSelection
			disableSelectionOnClick
			sx={{  
				flexGrow: 1,
				height: 600
			}}
		/>
	)
}
