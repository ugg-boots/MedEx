import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead,
TableRow, Paper, Collapse, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {setModalOpen} from "../../slices/procedureSlice.js";
import ProcedureDeleteDialog from './ProcedureDeleteDialog.jsx';
import { useDispatch } from "react-redux";

function Row(props) {
  const { row } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.procedureName}
        </TableCell>
        <TableCell align="right">{row.procedureDesc}</TableCell>
        <TableCell align="right">{row.materials}</TableCell>
        <TableCell> 
        <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>{dispatch(setModalOpen(row.procedureName))}}>
                    <DeleteIcon/>
                  </IconButton>
                  </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Materials Needed
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity per Procedure</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((itemRow) => (
                    <TableRow key={itemRow.product_name}>
                      <TableCell component="th" scope="row">
                        {itemRow.product_name}
                      </TableCell>
                      <TableCell>{itemRow.qty_per_procedure}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    procedureName: PropTypes.string.isRequired,
    procedureDesc: PropTypes.string.isRequired,
    materials: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        product_name: PropTypes.string.isRequired,
        qty_per_procedure: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default function ProcedureTable() {
  
  const procedureData = useSelector(state => state.procedures.procedureData)

  // build rows for table display
  // aggregate materials for each procedure
  const materialCount = {};
  const procedureArray = [];
  procedureData.forEach(element => {
    if (materialCount.hasOwnProperty(element.procedure_id)) materialCount[element.procedure_id]++;
    else {
      materialCount[element.procedure_id] = 1;
      procedureArray.push(element);
    }
  })

  // create rows
  const rows = [];
  procedureArray.forEach(procedure => {
    const materialsArray = [];
    procedureData.forEach(product => {
      if (procedure.procedure_id === product.procedure_id) {
        const newObj = {
          product_name: product.product_name,
          qty_per_procedure: product.qty_per_procedure
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
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Materials Needed</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
        <ProcedureDeleteDialog/>
      </Table>
    </TableContainer>
  );
}