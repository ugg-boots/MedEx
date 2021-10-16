import React from 'react';
import CatalogAddForm from './CatalogAddForm.jsx';
import CatalogTable from './CatalogTable.js';
import { Typography } from '@material-ui/core';

export default function Catalog() {
  return (
		<div>
			<Typography className="global-header" variant="h4">
				CATALOG
			</Typography>
			<div className="catalog-add-form">
				<CatalogAddForm />
			</div>
			<div className="catalog-table">
				<CatalogTable />
			</div>
		</div>
	);
};