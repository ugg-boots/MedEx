import React, {useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Button } from '@mui/material';

function HomeContainer(props) {
  const [procedure, setProcedure] = useState('');
  const [allProcedureNames, setAllProcedureNames] = useState([]);
  const [numProcedures, setNumProcedures] = useState([]);
  const [procedureData, setProcedureData] = useState([]);

  const handleChange = (event) => {
    setProcedure(event.target.value);
  };
  
  function getProcedureNames() {
    const procedureNames = [];
    fetch('/api/procedures')
    .then(res => res.json())
    .then((tableElements) => {
      if (!Array.isArray(tableElements)) tableElements = [];
      tableElements.forEach(element => {
        if (!procedureNames.includes(element.procedure_name)) procedureNames.push(element.procedure_name);
      })
      setAllProcedureNames(procedureNames);
      })
    .catch(err => console.log('InventoryAddForm.componentDidMount: getProductNames: ERROR: ', err));
    console.log(procedureNames);
  }

  function handleSubmit(event) {

  }

  useEffect(() => {
    getProcedureNames();
  }, [procedure])

  const menuItems=[];
  allProcedureNames.forEach(element => {
      menuItems.push(<MenuItem value={element}>{element}</MenuItem>)
  })

  return (
    <div>
        <Typography variant='h5'>Select a procedure</Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl onSubmit={(event) => handleSubmit(event)}>
            <InputLabel>Procedure</InputLabel>
            <Select
              value={procedure}
              label="Procedure"
              onChange={handleChange}
            >
              {menuItems}
            </Select>
            <br/>
            <Typography variant='h5'>Number of procedures:</Typography>
            <TextField
            label="Number of Procedures"
            variant="standard"
            value={numProcedures}
            onChange={(event) => {
              setNumProcedures(event.target.value);
            }} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
          </FormControl>
        </Box>

    </div>
  );
}

export default HomeContainer;