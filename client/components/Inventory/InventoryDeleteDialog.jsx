import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function InventoryDeleteDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display: "inline"}}>
      <Dialog
        open={open}
        onClose={handleClose}
      >
      <DialogTitle>Item to Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete the selected rows?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={(event) => {handleClose(event); props.deleteData(props.table)}} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
