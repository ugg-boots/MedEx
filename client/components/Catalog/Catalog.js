import React, {useState, useEffect} from 'react';
import { fetchProducts, fetchSuppliers, postCatalog } from '../../slices/catalogSlices'
import { useDispatch, useSelector } from 'react-redux'
import CatalogAddForm from './CatalogAddForm.jsx';
import CatalogTable from './CatalogTable.js';
import { Typography } from '@material-ui/core';

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
}

//   return (
//     <div>
//         <Typography variant='h5'>{name}</Typography>
//         {addButton}
//         {deleteButton}
//         <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           onSelectionModelChange={(newSelectionModel) => {
//             setSelectionModel(newSelectionModel);
//           }}
//           selectionModel={selectionModel}
//         />
//         {snackBar}
//       </div>
//     </div>
//   )
// };