const columnDefinitions = {
    suppliers: [
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
    ]
}

export default columnDefinitions;