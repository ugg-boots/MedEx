import React, { Component } from 'react';
import Table from './Table.jsx';

class TableContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
        const supplierColumns = [
            { 
              field: 'id',
              headerName: 'ID',
              width: 50
            },
            {
              field: 'supplier_name',
              headerName: 'Supplier Name',
              flex: 1
            },
            {
              field: 'phone_number',
              headerName: 'Phone Number',
              flex: 1,
              sortable: false
            },
            {
              field: 'key_contact',
              headerName: 'Key Contact',
              flex: 1,
              sortable: false
            },
            {
              field: 'address',
              headerName: 'Address',
              flex: 1,
              sortable: false
            }, 
          ];

        return (
            <div>
                <Table tableType='suppliers' tableColumns={supplierColumns}/>
            </div>
        )
      }
}

export default TableContainer;