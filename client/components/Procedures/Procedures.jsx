import React from 'react';
import ProcedureTable from './ProcedureTable.jsx';
import ProcedureAddForm from './ProcedureAddForm.jsx';
import { Typography } from '@material-ui/core';

function Procedures() {

  return (
    <div>
    <Typography className="supplier-view" variant='h4'> PROCEDURES</Typography>
      <div className="procedure-add-form">
        <ProcedureAddForm />
      </div>
      <div className="procedure-table">
        <ProcedureTable />
      </div>
    </div>
  )

}

export default Procedures;