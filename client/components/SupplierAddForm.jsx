import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { TextField, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; //redux
import { SupplierReducer } from '../slices/supplierSlice'; //redux

//created a functional component that takes a form and adds supplies
//redux is implemented
function SupplierAddForm(props) {
	//declared the dispatched
	console.log(props);
	const dispatch = useDispatch();

	const [supplierName, setSupplierName] = useState('');
	const [keyContact, setKeyContact] = useState('');
	const [supplierPhoneNumber, setSupplierPhoneNumber] = useState('');
	const [supplierAddress, setSupplierAddress] = useState('');
	const [warning, setWarning] = useState(null);
	const [warningOn, setWarningOn] = useState(false);

	const { getData, closeModal, data, openSnackBar } = props;

	function handleSubmit(event) {
		event.preventDefault();

		//validate data
		let duplicate = false;
		// console.log(data);
		// if (data[0] === undefined) return;
		// data.forEach((element) => {
		// 	if (element.supplier_name === supplierName) return (duplicate = true);
		// });
		if (duplicate) {
			setWarning(
				<Alert
					severity="warning"
					onClose={() => {
						setWarningOn(false);
					}}
				>
					Supplier is already in the database
				</Alert>
			);
			setWarningOn(true);
		}
		if (supplierName === '') {
			setWarning(
				<Alert
					severity="warning"
					onClose={() => {
						setWarningOn(false);
					}}
				>
					Supplier name is required
				</Alert>
			);
			setWarningOn(true);
		}
		if (keyContact === '') {
			setWarning(
				<Alert
					severity="warning"
					onClose={() => {
						setWarningOn(false);
					}}
				>
					Key contact is required
				</Alert>
			);
			setWarningOn(true);
		}
		if (supplierPhoneNumber === '') {
			setWarning(
				<Alert
					severity="warning"
					onClose={() => {
						setWarningOn(false);
					}}
				>
					Phone number is required
				</Alert>
			);
			setWarningOn(true);
		}
		if (supplierAddress === '') {
			setWarning(
				<Alert
					severity="warning"
					onClose={() => {
						setWarningOn(false);
					}}
				>
					Address is required
				</Alert>
			);
			setWarningOn(true);
		}

		//create request body
		else {
			const body = {
				supplier_name: supplierName,
				key_contact: keyContact,
				supplier_phone_number: supplierPhoneNumber,
				supplier_address: supplierAddress,
			};
			//once the Submit button is clicked the reducer will dispatch.
			dispatch(SupplierReducer(body));
			fetch('/api/suppliers', {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/JSON',
				},
				body: JSON.stringify(body),
			})
				.then((resp) => resp.json())
				.then((data) => {
					// getData();
					// closeModal(event);
					// openSnackBar();
				})
				.catch((err) => console.log('SupplierAddForm fetch /api/supplier: ERROR: ', err));
		}
	}

	let renderWarning;
	if (warningOn) {
		renderWarning = warning;
	} else renderWarning = null;

	return (
		<div>
			<Typography variant="h4">Add Supplier</Typography>
			{renderWarning}
			<form
				onSubmit={(event) => {
					handleSubmit(event);
				}}
			>
				<TextField
					label="Supplier Name"
					variant="standard"
					value={supplierName}
					onChange={(event) => {
						console.log(event);
						setSupplierName(event.target.value);
					}}
				/>
				<br />
				<TextField
					label="Key Contact"
					variant="standard"
					value={keyContact}
					onChange={(event) => {
						setKeyContact(event.target.value);
					}}
				/>
				<br />
				<TextField
					label="Phone Number"
					variant="standard"
					value={supplierPhoneNumber}
					onChange={(event) => {
						setSupplierPhoneNumber(event.target.value);
					}}
				/>
				<br />
				<TextField
					label="Address"
					variant="standard"
					value={supplierAddress}
					onChange={(event) => {
						setSupplierAddress(event.target.value);
					}}
				/>
				<br />
				<Button variant="contained" color="primary" type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
}

export default SupplierAddForm;
