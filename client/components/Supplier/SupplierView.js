import React from 'react';
import { Typography } from '@material-ui/core';
import SupplierAddForm from './SupplierAddForm.jsx';
import SupplierTable from './SupplierTable.js';

//This component will lift the state for SupplyTable and SupplyAddForm
const SupplierView = () => {
	return (
		<div>
		<Typography variant='h4'> Suppliers</Typography>
			<div className="supplier_addform">
				<SupplierAddForm />
			</div>
			<div className="supplier_table">
				<SupplierTable />
			</div>
		</div>
	);
};

export default SupplierView;
