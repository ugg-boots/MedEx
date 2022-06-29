import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Autocomplete, TextField, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { postCatalog } from '../../slices/catalogSlices'


function CatalogAddForm (props) {
  
  const dispatch = useDispatch();

  // useSelector to pull out supplierNames from dispatch(fetchSupplierName), need to populate dropdown list in render below:
  const allSupplierNames = useSelector(state => state.catalog.allSuppliers)
  // useSelector to pull out all product items, needed to check for duplicates already in db
  const allProducts = useSelector(state => state.catalog.allCatalogItems)
  const userId = useSelector((state) => state.auth.userId)

  // useState for modal open/close
  const [open, setOpen] = useState(false);

  // useState for add modal dialog:
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [qtyPerUnit, setQtyPerUnit] = useState('');
  const [maxStock, setMaxStock] = useState('');

  // useState for warnings in case of incorrect/duplicate data:
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);
  


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(event) {
    event.preventDefault();

    //validate information being typed into the form to make sure everything is proper to submit to database
    const duplicate = [];
    allProducts.forEach(item => duplicate.push(item.product_name))

    if (duplicate.includes(productName)) {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Product is already in the catalog</Alert>);
      setWarningOn(true);
    }
    if (productName === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Product name is required</Alert>);
      setWarningOn(true);
    }
    if (supplierName === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Supplier name is required</Alert>);
      setWarningOn(true);
    }
    if (unitPrice === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Unit price is required</Alert>);
      setWarningOn(true);
    }
    if (qtyPerUnit === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Quantity per unit is required</Alert>);
      setWarningOn(true);
    } else {

    // create request body to send to database
    const body = {
      product_name: productName,
      product_desc: productDesc, 
      supplier_name: supplierName,
      unit_price: unitPrice,
      qty_per_unit: qtyPerUnit,
      max_stock: maxStock,
      user_id: userId
    };

    // dispatch the add post to Catalog action to add item to the catalog store:
    dispatch(postCatalog(body));

    setProductName('');
    setProductDesc('');
    setSupplierName('');
    setUnitPrice('');
    setQtyPerUnit('');
    setMaxStock('');
    
    // close modal on submit button click:
    setOpen(false);
    }
  }

  // warning render if item in form is incorrect:
  let renderWarning;
  if (warningOn) {
    renderWarning = warning;
  }
  else renderWarning = null;

  return (
    <div>
    <Button variant="outlined" onClick={handleClickOpen}>
      Add Item to Catalog
    </Button>
    
    <Dialog open={open} onClose={handleClose}>
      {renderWarning}
      <DialogTitle>New Item to Add</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter new product information to add to the catalog.
        </DialogContentText>
        <TextField
          label="Product Name"
          variant="standard"
          value={productName}
          onChange={(event) => {
            setProductName(event.target.value);
          }} />
        <br/>
        <TextField
          label="Product Description"
          variant="standard"
          value={productDesc}
          onChange={(event) => {
            setProductDesc(event.target.value);
          }} />
        <br/>
        <Autocomplete
          options={allSupplierNames}
          sx={{ width: 270 }}
          value={supplierName}
          onChange={(_event, newSupplierName) => {
            setSupplierName(newSupplierName);
          }}
          name='supplierName'
          renderInput={params => (
          <TextField 
            {...params} 
            label="Supplier Name" 
            variant="standard" />
          )} />
        <br/>
        <TextField
          label="Unit Price"
          variant="standard"
          value={unitPrice}
          onChange={(event) => {
            setUnitPrice(event.target.value);
          }} />
        <br/>
        <TextField
          label="Quantity per Unit"
          variant="standard"
          value={qtyPerUnit}
          onChange={(event) => {
            setQtyPerUnit(event.target.value);
          }} />
        <br/>
        <TextField
          label="Target Stock Level"
          variant="standard"
          value={maxStock}
          onChange={(event) => {
            setMaxStock(event.target.value);
          }}/>
        <br/>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    
    </Dialog>
  </div>

  );
};

export default CatalogAddForm;