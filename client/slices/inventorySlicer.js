import { createSlice } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { 

  },
  reducers: { 
    addInventory: (state, action) => {
      state
    },
  }
  }
})

export const {addInventory} = inventorySlice.actions; 
export default inventorySlice.reducer; 
