import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import { TextField, Alert, InputLabel, Modal, Box} from '@mui/material'
import { fetchProducts } from '../../slices/procedureSlice'
import { postProcedures } from '../../slices/procedureSlice';
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

  const [procedureName, setProcedureName] = useState('');
  const [procedureDesc, setProcedureDesc] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getProductInfo = () => {
    fetch('/api/catalog')
      .then(res => res.json())
      .then((products) => {
        if (!Array.isArray(products)) products = [];
        const productArray = [];
        products.forEach(product => {
          const newObj = {};
          newObj.productName = product.product_name;
          newObj.productID = product.product_id;
          newObj.quantity = '';
          productArray.push(newObj);
        });
        setProductInfo(productArray);
      })
      .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
  }

  const handleModalOpen = () => {
      setModalOpen(true);
  }

  const handleModalClose = () => setModalOpen(false);
  
  const handleProductQuantityChange = (event, index) => {
    const productInfoCopy = productInfo.slice();
    productInfoCopy[index].quantity = event.target.value;
    setProductInfo(productInfoCopy);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate data
    //let duplicate = false;
    // data.forEach(element => {
    //   if (element.product_name === productName) return duplicate = true;
    // })
    /*if (duplicate) {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Procedure already exists</Alert>);
      setWarningOn(true);
    }
    if (productName === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Procedure name is required</Alert>);
      setWarningOn(true);
    }
    if (supplierName === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>Procedure description is required</Alert>);
      setWarningOn(true);
    }
    if (unitPrice === '') {
      setWarning(<Alert severity="warning" onClose={() => {setWarningOn(false)}}>At least one material is required</Alert>);
      setWarningOn(true);
    }
    */

    //create request body
    const body = {
      procedure_name: procedureName,
      procedure_desc: procedureDesc, 
      materials: productInfo
    };

    fetch('/api/procedures', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(data => {
        handleModalClose();
      })
      .catch(err => console.log('ProcedureAddForm fetch /api/procedures: ERROR: ', err));
  }

  useEffect(() => {
    getProductInfo();
  }, []);

  let productFields = [];
  if (productInfo.length) {
    productInfo.forEach((product, index) => {
      const input =
        <div>
         <InputLabel>{product.productName}</InputLabel>
          <TextField
            value={product.quantity}
            label={product.productName}
            onChange={(event) => {handleProductQuantityChange(event, index)}}
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
      <Button onClick={handleModalOpen} variant="outlined" color="secondary" size="small">Add Procedure</Button>
      <Modal open={modalOpen} onClose={handleModalClose}>
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
          <Button variant="outlined" color="secondary" onClick={handleModalClose}>Exit</Button>
        </Box>
      </Modal>
    </div>
      );
}

  export default ProcedureAddForm;