import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Table (props) {
    const {tableColumns, rows } = props;


    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={tableColumns}
          checkboxSelection={true}
        />
      </div>
    )
}

export default Table;