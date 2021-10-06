import React, { useState, useEffect } from "react";
import axios from 'axios';

const Inventory = ({table, getData, closeModal, openSnackBar }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expyDate, setExpyDate] = useState('');
  const [allProductNames, setAllProductNames] = useState('');
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);

  
  const addItem = async () => {
    await axios.post('/api/inventory') 
      .then((data) => {
        getData();
        openSnackBar();
    })
    .catch(err => console.log('addInventoryForm fetch /api/inventory: ERROR: ', err));
  };

  const deleteItem = async () => {
    await axios.delete('')
  }


  const getProductNames = async ()  => {
    const productNames = [];
    await axios.get('/api/catalog')
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

  return (
    <div style={{ display: "inline" }}>
      <Button variant="text" onClick={addItem}>
        Add Item
      </Button>
      <Button variant="text">Delete Item</Button>
    </div>
  );
}

export default Inventory;
