import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Autocomplete, TextField, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {fetchProductName, postInventory}  from '../../slices/inventorySlice';

export default function Inventory () {
  
  const [productName, setProductName] = useState('');    
  const [quantity, setQuantity] = useState('');
  const [expDate, setExpDate] = useState('');
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);


  const dispatch = useDispatch();
  const {allProductNames } = useSelector((state) => state.inventory);
 
  //getting all the available product names
  useEffect(() => {
    dispatch(fetchProductName());
  }, []);
  console.log("all product names: ",allProductNames)


  function handleSubmit(event) {
    event.preventDefault();

    //validate data
    if (productName === '' || quantity === '' ||  expDate === '') {
      const text = (productName === '') ? 'Product Name' : (quantity === '') ? 'Quantity' : 'Expiration Date'; 
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}> {text} is required</Alert>);
      setWarningOn(true);
    }
    //create request body
    else {
      const body = {
        product_name: productName,
        quantity: quantity, 
        expiration_date: expDate
      };
      console.log(body);
      dispatch(postInventory(body));
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
            value={expDate}
            onChange={(event) => {
            setExpDate(event.target.value);
          }} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
      </div>
      );
}