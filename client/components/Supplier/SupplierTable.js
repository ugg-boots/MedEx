import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

//MaterialUi component is rendering the table!
function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell component="th" scope="row">
					{row.supplier_id}
				</TableCell>
				<TableCell align="justify">{row.supplier_name}</TableCell>
				<TableCell align="justify">{row.key_contact}</TableCell>
				<TableCell align="justify">{row.supplier_phone_number}</TableCell>
				<TableCell align="justify">{row.supplier_address}</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

Row.propTypes = {
	row: PropTypes.shape({
		supplier_name: PropTypes.string.isRequired,
		key_contact: PropTypes.string.isRequired,
		supplier_phone_number: PropTypes.string.isRequired,
		supplier_address: PropTypes.string.isRequired,
	}).isRequired,
};

export default function SupplierTable() {
	const rows = []; //rows is passed down with keys and values

	//pulling the state from redux store
	const supplies = useSelector((state) => state.supplier.allSuppliers);

	//iterating through supplies state and storing the values to each corresponding key
	for (let i = 0; i < supplies.length; i++) {
		// destructured the keys and assign its corresponding values
		let { supplier_name, key_contact, supplier_phone_number, supplier_address, supplier_id } = supplies[i];
		//pushed the key with its corresponding value
		rows.push({ supplier_name, key_contact, supplier_phone_number, supplier_address, supplier_id });
	}
	console.log('rows', rows);

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell align="left">ID</TableCell>
						<TableCell align="left">Name</TableCell>
						<TableCell align="left">Key Contact</TableCell>
						<TableCell align="left">Phone Number</TableCell>
						<TableCell align="left">Address</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{rows && rows.map((row) => <Row key={row.supplier_id} row={row} />)}</TableBody>
			</Table>
		</TableContainer>
	);
}
