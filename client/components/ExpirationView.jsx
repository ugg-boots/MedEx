import React, {useState, useEffect} from 'react';
import {Typography} from '@mui/material';
import dayjs from 'dayjs';
import columnDefinitions from './columns.js';
import { DataGrid } from '@mui/x-data-grid';

function ExpirationView () {
    const [data, setData] = useState([]);
    
    const getData = () => {
        fetch('/api/inventory')
        .then(res => res.json())
        .then((tableElements) => {
          if (!Array.isArray(tableElements)) tableElements = [];
          setData(tableElements);
          })
        .catch(err => console.log('Table.componentDidMount: get tableElement: ERROR: ', err));
      }
    
      useEffect(() => {
        getData();
      }, [])

      const rows = [];
      const now = dayjs();
      const cutoff = now.add(3, 'months');
      data.forEach((element, index) => {
        const expyDate = dayjs(element.expiration_date);
        if (expyDate.isBefore(cutoff)) {
            element.id = index + 1; 
            rows.push(element)};
        })

    return (
        <div>
        <Typography variant="h5">Expiring Soon</Typography>
        <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columnDefinitions.expiration}
        />
      </div>
      </div>
        
    )
}

export default ExpirationView