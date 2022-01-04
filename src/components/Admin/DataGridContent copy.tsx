import React, { ReactElement } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// // When using TypeScript 4.x and above
// import type {} from '@mui/x-data-grid/themeAugmentation';
// import type {} from '@mui/x-data-grid-pro/themeAugmentation';

// const theme = createTheme({
//   components: {
//     // Use `MuiDataGrid` on both DataGrid and DataGridPro
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'red',
//         },
//       },
//     },
//   },
// });

interface Props {
	data: any[],
	info: any[],
}

export default function DataGridContentBackup({data, info}: Props): ReactElement {
	
	

	const rows: GridRowsProp[] = data.map((row: any, i) => {
		const rowData =  info.map(element => {
			// let key =   element.colName;
			let key =   element.dataName;
			
			const val = row[element.dataName];
			// let obj = { [key]: val };
			
			// console.log('object....', obj);

			return {
				[key]: val
				// ['col1']: val

			}

			// return {
			// 	element.colName: row[element.colName],
				
			// }	
		});

		console.log('rowdata...', rowData);
		// return rowData;
		return {
			id: row.id,
			...rowData
		}
		// return {
		// 	id: row.id,

		// }
	});

	// COLUMN NAMES
	const columns: GridColDef[] = info.map((column: any, i= 1) => {
		return {
			// field: 'col' + (i +1),
			field: column.dataName,
			headerName: column.colName + '',
			// headerName: column.name,
			// width: column.width,
			width: 150
			// width: column.width || 'auto',
		}
	});

	console.log('COLUMNS.....', columns);
	// console.log('ROWS.....', rows);
	
	// console.log(columnsForGrid);

	// console.log('DATA FOR GTID', dataForGrid);



	// console.log('rows....', rows);
	// console.log('coldefenitie....', columnsForGrid);


	return (
		<div style={{ height: 600, width: '100%' }}>
		<DataGrid rows={rows} columns={columns} />
	  </div>
	)
}
