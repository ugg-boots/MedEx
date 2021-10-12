import React from 'react';
import CatalogAddForm from './CatalogAddForm.jsx';
import CatalogTable from './CatalogTable.js';

export default function Catalog() {
  
  return (
    <div>
      <div className="catalog-add-form">
        <CatalogAddForm />
      </div>
      <div className="catalog-table">
        <CatalogTable />
      </div>
    </div>
  );
};