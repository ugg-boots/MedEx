import React, {useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { Box, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import columnDefinitions from './columns.js';
import { useSelector } from 'react-redux';

const ShoppingList = (props) => {
  const [procedure, setProcedure] = useState('');
  const [numProcedures, setNumProcedures] = useState([]);
  const [procedureData, setProcedureData] = useState([]);
  const [rows, setRows] = useState([]);
  const [inventory, setInventory] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const handleChange = (event) => {
    setProcedure(event.target.value);
  };
  
  const getProcedureData = () => {
    fetch(`/api/shop/${userId}`)
    .then(res => res.json())
    .then((tableElements) => {
      if (!Array.isArray(tableElements)) tableElements = [];
      setProcedureData(tableElements);
      })
    .catch(err => console.log('InventoryAddForm.componentDidMount: getProductNames: ERROR: ', err));
  }

  const getInventoryData = () => {
    fetch(`/api/inventory/${userId}`)
    .then(res => res.json())
    .then((tableElements) => {
      if (!Array.isArray(tableElements)) tableElements = [];
      setInventory(tableElements);
      })
    .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const inventoryList = {};
    inventory.forEach(element => {
      if (inventoryList.hasOwnProperty(element.product_name)) inventoryList[element.product_name] += element.quantity;
      else inventoryList[element.product_name] = element.quantity;
    })

    const rows = [];
    procedureData.forEach((element, index) => {
      if (element.procedure_name === procedure) {
      const total = Math.ceil(numProcedures * element.qty_per_procedure/element.qty_per_unit);
      let inInventory;
      if (!inventoryList.hasOwnProperty(element.product_name)) inInventory = 0;
      else inInventory = inventoryList[element.product_name];
      let needed = total - inInventory;
      if (needed < 0) needed = 0;
      const cost = needed * element.unit_price;
      const newObj = {
        product_name: element.product_name,
        total: total,
        inInventory: inInventory,
        needed: needed,
        cost: cost,
        supplier: element.supplier_name,
        id: index
      };
      rows.push(newObj);
      setRows(rows);
      }
    });
  }

  useEffect(() => {
    getProcedureData();
    getInventoryData();
  }, [])

  const procedureNames = [];
  procedureData.forEach(element => {
    if (!procedureNames.includes(element.procedure_name)) procedureNames.push(element.procedure_name);
  })
  const menuItems=[];
  procedureNames.forEach(element => {
      menuItems.push(<MenuItem value={element}>{element}</MenuItem>)
  })

  let datagrid;
  if (rows.length) {
    datagrid = <DataGrid rows={rows} columns={columnDefinitions.home} sortModel={[{ field: 'needed', sort: 'desc' }]}/>
  }

  return (
    <div>
        <Typography variant='h5' sx={{mt: 2}}>Select a procedure</Typography>
        <Box sx={{ minWidth: 120 }}>
          <form onSubmit={(event) => {console.log('submitted'); handleSubmit(event)}}>
            <InputLabel>Procedure</InputLabel>
            <Select
              value={procedure}
              label="Procedure"
              onChange={handleChange}
              sx={{mb: 1, mt: 1}}
            >
              {menuItems}
            </Select>
            <br/>
            <TextField
            label="Number of Procedures"
            variant="standard"
            value={numProcedures}
            sx={{mb: 1, mt: 1}}
            onChange={(event) => {
              setNumProcedures(event.target.value);
            }} />
          <br/>
          <Button variant="contained" color="primary" type="submit" sx={{mb: 1, mt: 1}}>Submit</Button>
          </form>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
        {datagrid}
        </div>
    </div>
  );
}

export default ShoppingList;