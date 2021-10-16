import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {setModalClose, deleteProcedure} from "../../slices/procedureSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProcedureDeleteDialog() {

const dispatch = useDispatch();
const {isProcedureDeleteModalOpen, deletedProcedureName,  procedureData } = useSelector((state) => state.procedures);

function getProcedureId(procName) {
  console.log("procedure data" , procedureData)
  for(let i = 0; i < procedureData.length; i++) {
    if(procedureData[i].procedure_name === procName) {
      return procedureData[i].procedure_id;
    }
  }
}
function handleSubmit(event) {
  event.preventDefault();
  //dispatch the delete action to remove the procedure
  const procedure_id = getProcedureId(deletedProcedureName);
  console.log(procedure_id)
  dispatch(deleteProcedure(procedure_id));
  //close modal on submit button click
  dispatch(setModalClose());
}
  return (
    <div>
      <Dialog
        open={isProcedureDeleteModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dispatch(setModalClose())}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Continue to Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this procedure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => {
            handleSubmit(event);
            dispatch(setModalClose())}}>Yes</Button>
          <Button onClick={() => dispatch(setModalClose())}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}