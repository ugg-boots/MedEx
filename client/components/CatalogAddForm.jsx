import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Autocomplete,TextField } from '@mui/material'


function CatalogAddForm (props) {
    
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [qtyPerUnit, setQtyPerUnit] = useState('');
  const [allSupplierNames, setAllSupplierNames] = useState('');

  const {table, getData, closeModal, data } = props;
  
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
      data.forEach(element => {
        if (element.product_name === productName) return duplicate = true;
      })
      if (duplicate) alert ('Product is already in the catalog');
      if (!allSupplierNames.includes(supplierName)) alert('Invalid supplier name');
      
 
      //create request body
      else {
      const body = {
        product_name: productName,
        product_desc: productDesc, 
        supplier_name: supplierName,
        unit_price: unitPrice,
        qty_per_unit: qtyPerUnit
      };

      fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          getData();
        })
        .catch(err => console.log('CatalogAddForm fetch /api/catalog: ERROR: ', err));
      }
    }

      return (
        <div>
        <Typography variant="h4">Add Products</Typography>
        <form onSubmit={(event) => {handleSubmit(event); closeModal(event);}}>
        <TextField
            label="Product Name"
            variant="standard"
            value={productName}
            onChange={(_event, newProductName) => {
              setUnitPrice(newProductName);
            }} />
        <br/>
        <TextField
            label="Product Description"
            variant="standard"
            value={productDesc}
            onChange={(_event, newProductDesc) => {
              setUnitPrice(newProductDesc);
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
            onChange={(_event, newUnitPrice) => {
              setUnitPrice(newUnitPrice);
            }} />
          <br/>
          <TextField
            label="Quantity per Unit"
            variant="standard"
            value={qtyPerUnit}
            onChange={(_event, newQtyPerUnit) => {
              setQtyPerUnit(newQtyPerUnit);
            }} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
}

  export default CatalogAddForm;