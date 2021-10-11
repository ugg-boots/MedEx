import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { TextField, Alert, InputLabel, Modal, Box} from '@mui/material';
import { fetchProductData, postProcedure } from '../../slices/procedureSlice';
import { handleProductQuantityChange } from '../../slices/procedureSlice';
import { useDispatch, useSelector } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProcedureAddForm () {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.procedures.productData);
  const procedureData = useSelector((state) => state.procedures.procedureData);

  const [procedureName, setProcedureName] = useState('');
  const [procedureDesc, setProcedureDesc] = useState('');
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate data
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
      //create request body
      const body = {
        procedure_name: procedureName,
        procedure_desc: procedureDesc, 
        materials: productData
      };

      dispatch(postProcedure(body));
      setModalOpen(false);
    }
  }

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  let productFields = [];
  if (productData.length) {
    productData.forEach((product, index) => {
      const input =
        <div>
         <InputLabel>{product.productName}</InputLabel>
          <TextField
            value={product.quantity}
            label={product.productName}
            onChange={(event) => {dispatch(handleProductQuantityChange({value: event.target.value, index: index}))}}
          />
        </div>
      productFields.push(input);
    })
  }

  let renderWarning;
  if (warningOn) {
    renderWarning = warning;
  }
  else renderWarning = null;

  return (
    <div>
      <Button onClick={() => {setModalOpen(true)}} variant="outlined" color="secondary" size="small">Add Procedure</Button>
      <Modal open={modalOpen} onClose={() => {setModalOpen(false)}}>
        <Box sx={style}>
          <Typography variant="h4">Add Procedure</Typography>
          {renderWarning}
          <form onSubmit={(event) => {handleSubmit(event)}}>
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
          {productFields}
          <Button variant="contained" color="primary" type="submit">Submit</Button>
          </form>
          <br/>
          <Button variant="outlined" color="secondary" onClick={() => {setModalOpen(false)}}>Exit</Button>
        </Box>
      </Modal>
    </div>
      );
}

  export default ProcedureAddForm;