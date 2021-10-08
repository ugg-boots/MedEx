import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Autocomplete, TextField, Alert } from '@mui/material'
import { addItem } from '../slices/catalogSlices'
import { useDispatch } from 'react-redux'


function CatalogAddForm (props) {
  
  const dispatch = useDispatch();

  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [qtyPerUnit, setQtyPerUnit] = useState('');
  const [maxStock, setMaxStock] = useState('');
  const [allSupplierNames, setAllSupplierNames] = useState('');
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);

  const { table, getData, closeModal, data, openSnackBar } = props;
  
    function getSupplierNames() {
      const supplierNames = [];
      fetch('/api/suppliers')
      .then(res => res.json())
      .then((tableElements) => {
        if (!Array.isArray(tableElements)) tableElements = [];
        tableElements.forEach(element => {
          supplierNames.push(element.supplier_name);
        })
        setAllSupplierNames(supplierNames);
        })
      .catch(err => console.log('InventoryAddForm.componentDidMount: getSupplierNames: ERROR: ', err));
    }

    useEffect(() => {
      getSupplierNames();
    }, [table])

    function handleSubmit(event) {
      event.preventDefault();

      //validate data
      let duplicate = false;
      // data.forEach(element => {
      //   if (element.product_name === productName) return duplicate = true;
      // })
      if (duplicate) {
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
      }
    
      //create request body
      else {
      const body = {
        product_name: productName,
        product_desc: productDesc, 
        supplier_name: supplierName,
        unit_price: unitPrice,
        qty_per_unit: qtyPerUnit,
        max_stock: maxStock
      };

      // dispatch the add item action to add item to the catalog store:
      dispatch(addItem(body));

      fetch('/api/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          getData();
          closeModal(event);
          openSnackBar();
        })
        .catch(err => console.log('CatalogAddForm fetch /api/catalog: ERROR: ', err));
      }
    }

    let renderWarning;
    if (warningOn) {
      renderWarning = warning;
    }
    else renderWarning = null;

      return (
        <div>
        <Typography variant="h4">Add Products</Typography>
        {renderWarning}
        <form onSubmit={(event) => {handleSubmit(event)}}>
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
      )}
    />
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
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
}

  export default CatalogAddForm;