import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Autocomplete, TextField, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postInventory } from "../../slices/inventorySlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function InventoryAddForm() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expDate, setExpDate] = useState("");
  const [warning, setWarning] = useState(null);
  const [warningOn, setWarningOn] = useState(false);

  const dispatch = useDispatch();

  const {
    allProductNames
  } = useSelector((state) => state.inventory);
  const userId = useSelector((state) => state.auth.userId)

  // useState for modal open/close
  const [open, setOpen] = useState(false);


  // console.log("all product names: ", allProductNames);
  // console.log("all inventory: ", allInventory);
  // console.log("grouped Inventory: ", groupedInventory);
  // console.log("displayed Inventory: ", displayedInventory);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const clearInput = () => {
    setProductName("");
    setExpDate("");
    setQuantity("")

  }

  function handleSubmit(event) {
    event.preventDefault();

    //validate data
    if (productName === "" || quantity === "" || expDate === "") {
      const text =
        productName === ""
          ? "Product Name"
          : quantity === ""
          ? "Quantity"
          : "Expiration Date";
      setWarning(
        <Alert
          severity="warning"
          onClose={() => {
            setWarningOn(false);
          }}
        >
          {" "}
          {text} is required
        </Alert>
      );
      setWarningOn(true);
    }
    //create request body
    else {
      const body = {
        product_name: productName,
        quantity: quantity,
        expiration_date: expDate,
        user_id: userId
      };
      //dispatch the postInventory actionb to add inventory item to the inventory
      dispatch(postInventory(body));

      //close modal on submit button click
      setOpen(false);
    }
  }

  let renderWarning;
  if (warningOn) {
    renderWarning = warning;
  } else renderWarning = null;

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Add Inventory</Button>
      <Dialog open={open} onClose={handleClose}>
      {renderWarning}
      <DialogTitle>New Item to Add</DialogTitle>
      <DialogContent>
         <DialogContentText>
           Enter new product information to add to the inventory.
         </DialogContentText>
        <Autocomplete
          options={allProductNames}
          sx={{ width: 270 }}
          value={productName}
          onChange={(event, newProductName) => {
            setProductName(newProductName);
          }}
          name="productName"
          renderInput={(params) => (
            <TextField {...params} label="Product Name" variant="standard" />
          )}
        />
        <br />
        <TextField
          label="Quantity"
          variant="standard"
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <br />
        <input
          style={{ marginTop: "20px", marginBottom: "20px" }}
          type="date"
          value={expDate}
          onChange={(event) => {
            setExpDate(event.target.value);
          }}
        />
        <br />
        </DialogContent>
        <DialogActions>
        <Button onClick={() =>{
          handleClose();
          clearInput();
          }}>Cancel</Button>
         <Button onClick={(event) => {
           handleSubmit(event)
           clearInput();
           }}>Submit</Button>
          </DialogActions>
          </Dialog>
     
    </div>
  );
}
