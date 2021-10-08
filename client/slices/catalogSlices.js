import * as types from '../actions/actionTypes'
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload)
      return ([...state, action.payload])
    },
    deleteItem: (state, action) => {

    },
  }
})

export const { addItem, deleteItem } = catalogSlice.actions;
export default catalogSlice.reducer;