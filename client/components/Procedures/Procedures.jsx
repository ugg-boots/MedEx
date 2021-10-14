import React from 'react';
import ProcedureTable from './ProcedureTable.jsx';
import ProcedureAddForm from './ProcedureAddForm.jsx';

function Procedures() {

  return (
    <div>
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