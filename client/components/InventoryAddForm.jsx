import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Autocomplete, TextField, Alert } from '@mui/material'


function InventoryAddForm (props) {
    
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expyDate, setExpyDate] = useState('');
  const [allProductNames, setAllProductNames] = useState('');
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);

  const {table, getData, closeModal, openSnackBar } = props;
  
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
      if (productName === '') {
        setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Product Name is required</Alert>);
        setWarningOn(true);
      }
      else if (quantity === '') {
        setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Quantity is required</Alert>);
        setWarningOn(true);
      }
      else if (expyDate === '') {
        setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Expiration date is required</Alert>);
        setWarningOn(true);
      }
 
      //create request body
      else {

      const body = {
        product_name: productName,
        quantity: quantity, 
        expiration_date: expyDate
      };

      console.log(body);

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
          closeModal();
          openSnackBar();
        })
        .catch(err => console.log('addInventoryForm fetch /api/inventory: ERROR: ', err));
      }
    }

    let renderWarning;
    if (warningOn) {
      renderWarning = warning;
    }
    else renderWarning = null;

      return (
        <div>
        <Typography variant="h4">Add Inventory</Typography>
        {renderWarning}
        <form onSubmit={(event) => {handleSubmit(event)}}>
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