import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  setModalClose,
  setModalOpen,
  deleteInventory,
  updateInventory
} from "../../slices/inventorySlice.js";
import { Autocomplete, TextField, Alert } from "@mui/material";
import { ContentCutOutlined } from "@mui/icons-material";

export default function InventoryDeleteDialog() {
  const [quantity, setQuantity] = useState();
  const [productName, setProductName] = useState()
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);

  const dispatch = useDispatch();

  const { allInventory, isDeleteModalOpen, itemDeleted, groupedInventory } =
    useSelector((state) => state.inventory);

  const max = itemDeleted.quantity;

  //handling the input number to be less or equal to the quanity
  function handler(e) {
    setQuantity(e.target.value);
  };

  function clearInput() {
    setQuantity('');
  }
  function handleSubmit(event) {
    event.preventDefault();
    //validate data
    if (quantity === "") {
      setWarning(
        <Alert
          severity="warning"
          onClose={() => {
            setWarningOn(false);
          }}
        >
          Quantity is required
        </Alert>
      );
      setWarningOn(true);
    }
    
    //create request body
    else {
      const body = {
        item_id: itemDeleted.item_id,
        quantity: max - Number(quantity),
      };
      //dispatch the update/delete action to add inventory item

      //check if the entire inventory needs to be deleted
      if(+quantity === max) { 
        dispatch(deleteInventory(body.item_id))
      }
      //update the item info to lower the quantity 
      else {
        dispatch(updateInventory(body));
      }
      //close modal on submit button click
      dispatch(setModalClose());
    }
  }
  let renderWarning;
  if (warningOn) {
    renderWarning = warning;
  } else renderWarning = null;

  return (
    <Dialog open={isDeleteModalOpen} onClose={() => dispatch(setModalClose())}>
      {renderWarning}
      <DialogTitle>Select Quantity of {itemDeleted.product_name} to Delete </DialogTitle>
      <DialogContent>
        <TextField
          label="Quantity"
          variant="standard"
          type="number"
          InputProps={{inputProps: { min: "0", max: max, step: "1" }}}
          style = {{width: 100}}
          value={quantity}
          onChange={(event) => {
            handler(event)
          }}
        />
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={(event) => {
          handleSubmit(event);
          clearInput();
        }}> Delete </Button>
        <Button onClick={() => {
          dispatch(setModalClose());
          clearInput();
        }} autoFocus>
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
