import InventoryAddForm from './InventoryAddForm.jsx';
import { InventoryTable } from './InventoryTable.jsx';
import React from 'react';
import { Typography } from '@material-ui/core';

export default function Inventory() {
	return (
		<div>
			<Typography className="supplier-view" variant="h4">INVENTORY</Typography>
			<div className="inventory-add-form">
				<InventoryAddForm />
			</div>
			<div className="inventory-table">
				<InventoryTable />
			</div>
		</div>
	);
}
