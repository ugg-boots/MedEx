import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import columnDefinitions from './columns.js';
import AddModal from './AddModal.jsx';
import SimpleSnackBar from './SimpleSnackBar.jsx';


//created a functional component that will useHistory hook to find the pathname and redirect the user to the page. 
//eliminates the use of conditional rendering 
function TableContainer(props) {
	const {table} = props 

	const name = table[0].toUpperCase() + table.slice(1);
	const columns = columnDefinitions[table];

	const [data, setData] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	const [snackBarOpen, setSnackBarOpen] = useState(false);

	//not setup yet
	const getData = () => {
		fetch('/api/' + table)
			.then((res) => res.json())
			.then((tableElements) => {
				if (!Array.isArray(tableElements)) tableElements = [];
				setData(tableElements);
			})
			.catch((err) => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
	};

	const handleSnackBarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackBarOpen(false);
	};

	const openSnackBar = () => {
		setSnackBarOpen(true);
	};

	//delete function prop drilled to InventoryDeleteDialog
	const deleteData = (table) => {
		let toBeDeleted = [];
		let varName;
		switch (table) {
			case 'suppliers':
				varName = 'supplier_id';
				break;
			case 'procedures':
				varName = 'junction_id';
				break;
			case 'catalog':
				varName = 'product_id';
				break;
			case 'inventory':
				varName = 'item_id';
				break;
		}
//currently we are not getting any data from the endpoint
		data.forEach((element) => {
			if (selectionModel.includes(element.id)) {
				toBeDeleted.push(element[varName]);
			}
		});

		fetch('/api/' + table, {
			method: 'DELETE',
			body: JSON.stringify(toBeDeleted),
			headers: {
				'Content-Type': 'Application/JSON',
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				getData();
				setSelectionModel([]);
			})
			.catch((err) => console.log(`Table fetch /api/${table}: ERROR: `, err));
	};

	useEffect(() => {
		getData(table);
	}, [table]);

  //checking if data has a value if not dont run foreach
	const rows = [];
	if (data[0] === undefined) return;
	data.forEach((element, index) => {
		element.id = index + 1;
		rows.push(element);
	});

	let addButton;
	let deleteButton;
	if (table === 'inventory') {
		addButton = <AddModal getData={getData} table={table} data={data} openSnackBar={openSnackBar} />;
		deleteButton = <InventoryDeleteDialog table={table} deleteData={deleteData} />;
	} else if (table === 'catalog') {
		addButton = <AddModal getData={getData} table={table} data={data} openSnackBar={openSnackBar} />;
		deleteButton = null;
	} else if (table === 'suppliers') {
		addButton = <AddModal getData={getData} table={table} data={data} openSnackBar={openSnackBar} />;
		deleteButton = null;
	} else if (table === 'procedures') {
		addButton = null;
		deleteButton = null;
	}

  //will pop an alert
	let snackBar;
	if (snackBarOpen) {
		let alertText;
		if (table === 'catalog') alertText = 'Added new product';
		if (table === 'inventory') alertText = 'Added new item';
		if (table === 'suppliers') alertText = 'Added new supplier';

		snackBar = <SimpleSnackBar open={snackBarOpen} handleClose={handleSnackBarClose} alertText={alertText} />;
	}

	return (
		<div>
			<Typography variant="h5">{name}</Typography>
			{addButton}
			{deleteButton}
			<div style={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					onSelectionModelChange={(newSelectionModel) => {
						setSelectionModel(newSelectionModel);
					}}
					selectionModel={selectionModel}
				/>
				{snackBar}
			</div>
		</div>
	);
}

export default TableContainer;
