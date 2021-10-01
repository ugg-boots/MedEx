import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Autocomplete,TextField } from '@mui/material'


function SupplierAddForm (props) {
    
  const [supplierName, setSupplierName] = useState('');
  const [keyContact, setKeyContact] = useState('');
  const [supplierPhoneNumber, setSupplierPhoneNumber] = useState('');
  const [supplierAddress, setSupplierAddress] = useState('');

  const { getData, closeModal, data, openSnackBar } = props;

    function handleSubmit(event) {
      event.preventDefault();

      //validate data
      let duplicate = false;
      data.forEach(element => {
        if (element.supplier_name === supplierName) return duplicate = true;
      })
      if (duplicate) alert ('Supplier is already in the database');
 
      //create request body
      else {
      const body = {
        supplier_name: supplierName,
        key_contact: keyContact, 
        supplier_phone_number: supplierPhoneNumber,
        supplier_address: supplierAddress,
      };

      fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          getData();
          openSnackBar();
        })
        .catch(err => console.log('SupplierAddForm fetch /api/supplier: ERROR: ', err));
      }
    }

      return (
        <div>
        <Typography variant="h4">Add Supplier</Typography>
        <form onSubmit={(event) => {handleSubmit(event); closeModal(event);}}>
        <TextField
            label="Supplier Name"
            variant="standard"
            value={supplierName}
            onChange={(event) => {
              setSupplierName(event.target.value);
            }} />
        <br/>
        <TextField
            label="Key Contact"
            variant="standard"
            value={keyContact}
            onChange={(event) => {
              setKeyContact(event.target.value);
            }} />
          <br/>
          <TextField
            label="Phone Number"
            variant="standard"
            value={supplierPhoneNumber}
            onChange={(event) => {
              setSupplierPhoneNumber(event.target.value);
            }} />
          <br/>
          <TextField
            label="Address"
            variant="standard"
            value={supplierAddress}
            onChange={(event) => {
              setSupplierAddress(event.target.value);
            }} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
}

  export default SupplierAddForm;