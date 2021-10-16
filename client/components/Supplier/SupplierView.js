import React from 'react';
import { Typography } from '@material-ui/core';
import SupplierAddForm from './SupplierAddForm.js';
import SupplierTable from './SupplierTable.js';

//This component will lift the state for SupplyTable and SupplyAddForm
const SupplierView = () => {
	return (
		<div>
		<Typography className="supplier-view" variant='h4'> SUPPLIERS</Typography>
			<div className="supplier-addform">
				<SupplierAddForm />
			</div>
			<div className="supplier-table">
				<SupplierTable />
			</div>
		</div>
	);
};

export default SupplierView;
