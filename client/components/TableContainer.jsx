import React, {useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import columnDefinitions from './columns.js';
import AddModal from './AddModal.jsx';
import InventoryDeleteDialog from './InventoryDeleteDialog.jsx';

function TableContainer(props) {
  const { table } = props;
  const name = table[0].toUpperCase() + table.slice(1);
  const columns = columnDefinitions[table];

  const [data, setData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const getData = () => {
    fetch('/api/' + table)
      .then(res => res.json())
      .then((tableElements) => {
        if (!Array.isArray(tableElements)) tableElements = [];
        setData(tableElements);
        })
      .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
  }

  const deleteData = (table) => {
    let toBeDeleted = [];
      let varName;
      switch (table) {
        case 'suppliers':
          varName = 'supplier_id';
          break;
        case 'procedures':
          varName = 'junction_id';
          break;
        case 'catalog':
          varName = 'product_id';
          break;
        case 'inventory':
          varName = 'item_id';
          break;
        }

      data.forEach(element => {
        if (selectionModel.includes(element.id)) {
          toBeDeleted.push(element[varName]);
        }
      });

      fetch('/api/' + table, {
        method: 'DELETE',
        body: JSON.stringify(toBeDeleted),
        headers: {
          'Content-Type': 'Application/JSON'
        },
      })
      .then(resp => resp.json())
      .then((data) => {
        getData();
        setSelectionModel([]);
      })
      .catch(err => console.log(`Table fetch /api/${table}: ERROR: `, err));
  }

  useEffect(() => {
    getData(table);
  }, [table]);

  const rows = [];
    data.forEach((element, index) => {
      element.id = index + 1; 
      rows.push(element)});

  let addButton;
  let deleteButton;
  if (table === 'inventory') {
    addButton = <AddModal getData={getData} table={table} data={data}/>;
    deleteButton = <InventoryDeleteDialog table={table} deleteData={deleteData}/>
  }
  else if (table === 'catalog') {
    addButton = <AddModal getData={getData} table={table} data={data}/>;
    deleteButton = null;
  }
  else if (table === 'suppliers') {
    addButton = <AddModal getData={getData} table={table} data={data}/>;
    deleteButton = null;
  }
  else {
    addButton = null;
    deleteButton = null;
  }

  return (
    <div>
        <Typography variant='h5'>{name}</Typography>
        {addButton}
        {deleteButton}
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </div>
    </div>
  )
}

export default TableContainer; 