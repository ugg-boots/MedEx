const columnDefinitions = {
    suppliers: [
          {
            field: 'supplier_name',
            headerName: 'Supplier Name',
            flex: 1
          },
          {
            field: 'supplier_phone_number',
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
            field: 'supplier_address',
            headerName: 'Address',
            flex: 1,
            sortable: false
          },
    ],
    catalog: [
      {
        field: 'product_name',
        headerName: 'Product Name',
        flex: 1
      },
      {
        field: 'product_desc',
        headerName: 'Description',
        flex: 1,
        sortable: false
      },
      {
        field: 'supplier_name',
        headerName: 'Supplier',
        flex: 1
      },
      {
        field: 'unit_price',
        headerName: 'Price per Unit',
        flex: 1
      },
      {
        field: 'qty_per_unit',
        headerName: 'Quantity per Unit',
        flex: 1
      },
    ],
    procedures: [
      {
        field: 'procedure_name',
        headerName: 'Procedure Name',
        flex: 1,
      },{
        field: 'procedure_desc',
        headerName: 'Procedure Description',
        flex: 1,
        sortable: false
      },{
        field: 'product_name',
        headerName: 'Needed Materials',
        flex: 1
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 1,
      },
    ],
    inventory: [
      {
        field: 'product_name',
        headerName: 'Product Name',
        flex: 1
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        flex: 1,
      },
      {
        field: 'expy_date',
        headerName: 'Expiration Date',
        flex: 1
      },
    ]
}

export default columnDefinitions;