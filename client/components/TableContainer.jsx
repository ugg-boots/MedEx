import React, {useState, useEffect} from 'react';
import Table from './Table.jsx';
import columnDefinitions from './columns.js';
import InventoryAddModal from './InventoryAddModal.jsx';
import { Button, Typography } from '@material-ui/core';
import InventoryDeleteDialog from './InventoryDeleteDialog.jsx';

function TableContainer(props) {
  const {table} = props;
  const name = table[0].toUpperCase() + table.slice(1);
  const columns = columnDefinitions[table];

  const [data, setData] = useState([]);

  const getData = (tableType) => {
    fetch('/api/' + tableType)
      .then(res => res.json())
      .then((tableElements) => {
        if (!Array.isArray(tableElements)) tableElements = [];
        setData(tableElements);
        })
      .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
  }

  useEffect(() => {
    getData(table);
  }, [table]);

  const rows = [];
    data.forEach((element, index) => {
      element.id = index + 1; 
      rows.push(element)});

  let addButton;
  if (table === 'inventory') addButton = <InventoryAddModal getData={getData}/>;
  else addButton = <Button variant='outlined' color='secondary' size='small'>Add Entry</Button>


  return (
    <div>
        <Typography variant='h5'>{name}</Typography>
        {addButton}
        <InventoryDeleteDialog />
        <Table rows={rows} tableType={table} tableColumns={columns}/>
    </div>
  )
}

export default TableContainer;