import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Table (props) {
    const { tableType, tableColumns } = props;
    const [data, setData] = useState([]);

    const getData = (tableType) => {
      console.log(tableType);
      fetch('/api/' + tableType)
        .then(res => res.json())
        .then((tableElements) => {
          if (!Array.isArray(tableElements)) tableElements = [];
          setData(tableElements);
          })
        .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
    }
    
    useEffect(() => {
      getData(tableType);
    }, [tableType]);
    
    const columns = tableColumns;
       
    const rows = [];
    data.forEach((element, index) => {
      element.id = index + 1; 
      rows.push(element)});

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </div>
    )
}

export default Table;