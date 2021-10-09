import React, {useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProducts } from '../../slices/catalogSlices'
import { useDispatch, useSelector } from 'react-redux'
import columnDefinitions from '../columns.js';
import AddModal from '../AddModal.jsx';
import InventoryDeleteDialog from '../InventoryDeleteDialog.jsx';
import SimpleSnackBar from '../SimpleSnackBar.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Catalog() {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//   return (
//     <div>
//         <Typography variant='h5'>{name}</Typography>
//         {addButton}
//         {deleteButton}
//         <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           onSelectionModelChange={(newSelectionModel) => {
//             setSelectionModel(newSelectionModel);
//           }}
//           selectionModel={selectionModel}
//         />
//         {snackBar}
//       </div>
//     </div>
//   )
// };