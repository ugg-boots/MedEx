import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { TextField, Alert, InputLabel, Modal, Box } from '@mui/material';
import { useDispatch } from 'react-redux'; //redux
import { postSupplier } from '../../slices/supplierSlice'; //redux
import { createTheme } from '@mui/system'; 

//the style label is styling the form
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 700,
	bgcolor: 'background.paper',
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
};

const theme = createTheme({

})
//created a functional component that takes a form and adds supplies
function SupplierAddForm() {
	//declared the dispatched
	const dispatch = useDispatch();

	const [supplierName, setSupplierName] = useState('');
	const [keyContact, setKeyContact] = useState('');
	const [supplierPhoneNumber, setSupplierPhoneNumber] = useState('');
	const [supplierAddress, setSupplierAddress] = useState('');
	const [warning, setWarning] = useState(null);
	const [warningOn, setWarningOn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => setModalOpen(false);

	function handleSubmit(event) {
		event.preventDefault();

		{
			const body = {
				supplier_name: supplierName,
				key_contact: keyContact,
				supplier_phone_number: supplierPhoneNumber,
				supplier_address: supplierAddress,
			};
			//once the Submit button is clicked the reducer will dispatch.
			dispatch(postSupplier(body));
			//resetting state after submission!
			setSupplierName('');
			setKeyContact('');
			setSupplierPhoneNumber('');
			setSupplierAddress('');
			setModalOpen(false); //close modal when submit button clicked
		}
	}

	let renderWarning;
	if (warningOn) {
		renderWarning = warning;
	} else renderWarning = null;

	return (
		<div>
			<Button  onClick={handleModalOpen} variant="outlined" color="inherit"  style={{ fontSize: 12 }}>
				Add Supplier
			</Button>
			<Modal open={modalOpen} onClose={handleModalClose}>
				<Box sx={style}>
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
						<Button variant="outlined" color="inherit" type="submit">
							Submit
						</Button>
					</form>
					<br />
					<Button variant="outlined" color="inherit" onClick={handleModalClose}>
						Exit
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default SupplierAddForm;
