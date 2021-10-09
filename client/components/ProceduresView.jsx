import React, {useEffect} from 'react';
import { Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProcedureData } from '../slices/procedureSlice.js';
import ProcedureTable from './ProcedureTable.jsx';

function ProceduresView() {
  
  const data = useSelector((state) => state.procedures.procedureData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProcedureData('procedures'));
  }, []);

  console.log(data);

  const materialCount = {};
  const procedureArray = [];
  data.forEach(element => {
    if (materialCount.hasOwnProperty(element.procedure_id)) materialCount[element.procedure_id]++;
    else {
      materialCount[element.procedure_id] = 1;
      procedureArray.push(element);
    }
  })

  const rows = [];
  procedureArray.forEach(procedure => {
    const materialsArray = [];
    data.forEach(product => {
      if (procedure.procedure_id === product.procedure_id) {
        const newObj = {
          product_name: product.product_name,
          qty_per_procedure: procedure.qty_per_procedure
        }
        materialsArray.push(newObj);
      }
    });  
    
    rows.push({
      procedureName: procedure.procedure_name,
      procedureDesc: procedure.procedure_desc, 
      materials: materialCount[procedure.procedure_id],
      items: materialsArray 
    })
  })

  return (
    <div>
        <Typography variant='h5'>Procedures</Typography>
        <div style={{ height: 400, width: '100%' }}>
        <ProcedureTable rows={rows}/>
      </div>
    </div>
  )

}

export default ProceduresView;