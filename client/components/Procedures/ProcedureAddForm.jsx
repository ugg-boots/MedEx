import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { TextField, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { postProcedure } from '../../slices/procedureSlice';
import { handleProductQuantityChange, resetProductData } from '../../slices/procedureSlice';

function ProcedureAddForm () {
  
  const dispatch = useDispatch();
  
  // useSelector to pull out productData from dispatch(fetchProductData), need to populate form fields in render below:
  const productData = useSelector((state) => state.procedures.productData);
  // useSelector to pull out all procedure data, needed to check for duplicates already in db
  const procedureData = useSelector((state) => state.procedures.procedureData);
  const userId = useSelector((state) => state.auth.userId)

   // useState for basic form data:
  const [procedureName, setProcedureName] = useState('');
  const [procedureDesc, setProcedureDesc] = useState('');
  
  // useState for warnings in case of incorrect/duplicate data:
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);
  
  // useState for modal open/close
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

     //validate information being typed into the form to make sure everything is proper to submit to database
    let duplicate = false;
    procedureData.forEach(element => {
      if (element.procedure_name === procedureName) return duplicate = true;
    })

    let materials = false;
    productData.forEach(element => {
      if (element.quantity > 0) materials = true;
    });

    if (duplicate) {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Procedure already exists</Alert>);
      setWarningOn(true);
    }
    else if (procedureName === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Procedure name is required</Alert>);
      setWarningOn(true);
    }
    else if (procedureDesc === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Procedure description is required</Alert>);
      setWarningOn(true);
    }    
    else if (!materials) {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>At least one material is required</Alert>);
      setWarningOn(true);
    }

    else {
      // create request body to send to database
      const body = {
        procedure_name: procedureName,
        procedure_desc: procedureDesc, 
        materials: productData,
        user_id: userId
      };

      // dispatch the add post to Procedures action to add item to the procedures store:
      dispatch(postProcedure(body));
      
      //reset form fields after submission
      setProcedureName('');
      setProcedureDesc('');
      dispatch(resetProductData());

      // close modal
      setOpen(false);
    }
  }

  let productFields;
  if (productData.length) {
    productFields = productData.map((product, index) => (
          <div>
          <TextField
            value={product.quantity}
            label={product.productName}
            onChange={(event) => {dispatch(handleProductQuantityChange({value: event.target.value, index: index}))}}
          />
          </div>
        )
    )
  }

  // warning render if item in form is incorrect:
  let renderWarning;
  if (warningOn) {
    renderWarning = warning;
  }
  else renderWarning = null;

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Define New Procedure</Button>
      <Dialog open={open} onClose={handleClose}>
      {renderWarning}
      <DialogTitle>New Procedure to Add</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter new procedure information.
        </DialogContentText>
          <TextField
            label="Procedure Name"
            variant="standard"
            value={procedureName}
            onChange={(event) => {
              setProcedureName(event.target.value);
            }} />
          <br/>
          <TextField
            label="Procedure Description"
            variant="standard"
            value={procedureDesc}
            onChange={(event) => {
              setProcedureDesc(event.target.value);
            }} />
          <br/>
          <DialogContentText>
          Enter quantity needed of each product.
          </DialogContentText>
          {productFields}
          </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    
    </Dialog>
    </div>
      );
}

  export default ProcedureAddForm;