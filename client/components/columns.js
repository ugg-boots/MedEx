var dayjs = require('dayjs')

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
        flex: 1,
        valueFormatter: (params) => { return formatCurrency(params.value);},
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
        field: 'qty_per_procedure',
        headerName: 'Quantity Needed Per Procedure',
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
        field: 'expiration_date',
        headerName: 'Expiration Date',
        flex: 1,
        valueFormatter: (params) => { return formatDate(params.value);},
      },
    ],
    home: [
      {
        field: 'product_name',
        headerName: 'Product Name',
        flex: 1
      },
      {
        field: 'total',
        headerName: 'Needed',
        flex: 1,
      },
      {
        field: 'inInventory',
        headerName: 'In Stock',
        flex: 1,
      },
      {
        field: 'needed',
        headerName: 'To Be Purchased',
        flex: 1,
      },
      {
        field: 'cost',
        headerName: 'Total Cost',
        flex: 1,
        valueFormatter: (params) => { return formatCurrency(params.value);},
      },
      {
        field: 'supplier',
        headerName: 'Supplier',
        flex: 1,
      },
    ],
    expiration: [
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
          field: 'expiration_date',
          headerName: 'Expiration Date',
          flex: 1,
          valueFormatter: (params) => { return formatDate(params.value);},
        },
    ],
    lowStock: [
      {
        field: 'product_name',
        headerName: 'Product Name',
        flex: 1
      },
      {
        field: 'quantity',
        headerName: 'In Stock',
        flex: 1,
      },
      {
        field: 'max_stock',
        headerName: 'Target',
        flex: 1,
      },
      {
        field: 'percent',
        headerName: '% Target',
        flex: 1,
        valueFormatter: (params) => { return formatPercent(params.value);},
      },
    ]
}

const formatDate = (date) => {
  const newDate = dayjs(date);
  return newDate.format('YYYY MMM DD');
}

const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return formatter.format(value);
}

const formatPercent = (value) => {
  return parseFloat(value * 100).toFixed(2)+"%"
}

export default columnDefinitions;