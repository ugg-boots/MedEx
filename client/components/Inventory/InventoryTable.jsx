import { useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryDeleteDialog from './InventoryDeleteDialog.jsx'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/catalogSlices.js";
import {fetchInventory, deleteInventory, setModalClose, setModalOpen} from '../../slices/inventorySlice.js';




export const InventoryTable = () => {
  const dispatch = useDispatch();

  const {allProductNames, groupedInventory, allInventory, displayedInventory} = useSelector((state) => state.inventory);


  // console.log("all product names: ",allProductNames);
  // console.log("all inventory: ",allInventory)
  // console.log("grouped Inventory: ", groupedInventory);
  // console.log("displayed Inventory: ", displayedInventory);
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Product ID</TableCell>
            <TableCell align="right">Product Name </TableCell>
            <TableCell align="right">Quantity</TableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedInventory.map((item) => ( 
              <Row key={item.product_id} row={item} />
          ))}
        </TableBody>
        <InventoryDeleteDialog/>
      </Table>
    </TableContainer>
  );

};

function Row(props) {
  const dispatch = useDispatch();
  const {row} = props; 
  const {product_name, quantity, product_id, metadata} = row;
  const [open, setOpen] = React.useState(false);

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
          {product_id}
        </TableCell>
        <TableCell align="right">{product_name}</TableCell>
        <TableCell align="right">{quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell>Item ID</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Expiration Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metadata.map((el) => (
                    <TableRow key={el.item_id}>
                       <TableCell component="th" scope="row">
                        {el.item_id}
                      </TableCell>
                      <TableCell >
                        {el.product_name}
                      </TableCell>
                      <TableCell>{el.quantity}</TableCell>
                      <TableCell align="right">{el.expiration_date}  
                  </TableCell>
                  <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>{dispatch(setModalOpen(el))}}>
                    <DeleteIcon />
                  </IconButton>
                  </TableCell>
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
};
