import React from 'react';
import Table from './Table.jsx';
import columnDefinitions from './columns.js';
import { Button, Typography } from '@material-ui/core';

function TableContainer(props) {
  const {table} = props;
  const name = table[0].toUpperCase() + table.slice(1);
  const columns = columnDefinitions[table];

  return (
    <div>
        <Typography variant='h5'>{name}</Typography>
        <Button variant='outlined' color='secondary' size='small'>Add Entry</Button>
        <Table tableType={table} tableColumns={columns}/>
    </div>
  )
}

export default TableContainer;