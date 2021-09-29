import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Autocomplete,TextField } from '@mui/material'


function InventoryAddForm (props) {
    
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expyDate, setExpyDate] = useState('');
  const [allProductNames, setAllProductNames] = useState('');

  const {table, getData, closeModal } = props;
  
    function getProductNames() {
      const productNames = [];
      fetch('/api/catalog')
      .then(res => res.json())
      .then((tableElements) => {
        if (!Array.isArray(tableElements)) tableElements = [];
        tableElements.forEach(element => {
          productNames.push(element.product_name);
        })
        setAllProductNames(productNames);
        })
      .catch(err => console.log('InventoryAddForm.componentDidMount: getProductNames: ERROR: ', err));
    }

    useEffect(() => {
      getProductNames();
    }, [table])

    function handleSubmit(event) {
      event.preventDefault();

      //validate data
      if (productName === '') alert('Product Name is required');
      else if (!allProductNames.includes(productName)) alert('Invalid product name');
      else if (quantity === '') alert('Quantity is required');
      else if (expyDate === '') alert('Expiration date is required');
 
      //create request body
      else {

      const body = {
        product_name: productName,
        quantity: quantity, 
        expiration_date: expyDate
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
        .catch(err => console.log('addInventoryForm fetch /api/inventory: ERROR: ', err));
      }
    }

      return (
        <div>
        <Typography variant="h4">Add Inventory</Typography>
        <form onSubmit={(event) => {handleSubmit(event); closeModal(event);}}>
        <Autocomplete
          options={allProductNames}
          sx={{ width: 270 }}
          value={productName}
          onChange={(event, newProductName) => {
            setProductName(newProductName);
          }}
          name='productName'
          renderInput={params => (
            <TextField 
              {...params} 
              label="Product Name" 
              variant="standard" />
      )}
    />
          <br/>
          <TextField
            label="Quantity"
            variant="standard"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value);
            }} />
          <br/>
          <input
            style={{marginTop: '20px', marginBottom: '20px'}}
            type='date'
            value={expyDate}
            onChange={(event) => {
              setExpyDate(event.target.value);
            }} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
}

  export default InventoryAddForm;