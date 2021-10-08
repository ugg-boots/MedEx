import { createSlice } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

export const addInventory = createSlice({
  name: 'inventory',
  initialState: { 

  },
  reducers: { 
    addReducer: (state, action) => {
      state
    }
  }
})