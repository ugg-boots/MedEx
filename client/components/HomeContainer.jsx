import React, {useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { Box, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import columnDefinitions from './columns.js';

function HomeContainer(props) {
  const [procedure, setProcedure] = useState('');
  const [numProcedures, setNumProcedures] = useState([]);
  const [procedureData, setProcedureData] = useState([]);
  const [rows, setRows] = useState([]);

  const handleChange = (event) => {
    setProcedure(event.target.value);
  };
  
  const getProcedureData = () => {
    fetch('/api/home')
    .then(res => res.json())
    .then((tableElements) => {
      if (!Array.isArray(tableElements)) tableElements = [];
      setProcedureData(tableElements);
      })
    .catch(err => console.log('InventoryAddForm.componentDidMount: getProductNames: ERROR: ', err));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const rows = [];
    procedureData.forEach((element, index) => {
      if (element.procedure_name === procedure) {
      const total = Math.ceil(numProcedures * element.qty_per_procedure/element.qty_per_unit);
      const cost = total * element.unit_price;
      const newObj = {
        product_name: element.product_name,
        total: total,
        cost: cost,
        supplier: element.supplier_name,
        id: index
      };
      rows.push(newObj);
      setRows(rows);
      }
    });
    console.log(rows);
  }

  useEffect(() => {
    getProcedureData();
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
    datagrid = <DataGrid rows={rows} columns={columnDefinitions.home}/>
  }

  return (
    <div>
        <Typography variant='h5'>Select a procedure</Typography>
        <Box sx={{ minWidth: 120 }}>
          <form onSubmit={(event) => {console.log('submitted'); handleSubmit(event)}}>
            <InputLabel>Procedure</InputLabel>
            <Select
              value={procedure}
              label="Procedure"
              onChange={handleChange}
            >
              {menuItems}
            </Select>
            <br/>
            <TextField
            label="Number of Procedures"
            variant="standard"
            value={numProcedures}
            onChange={(event) => {
              setNumProcedures(event.target.value);
            }} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
          </form>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
        {datagrid}
        </div>
    </div>
  );
}

export default HomeContainer;