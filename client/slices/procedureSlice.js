import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

const initialState = {
    procedureData: [],
}

export const fetchProcedureData = createAsyncThunk(
  'procedures/fetchProcedures',
  async (_, thunkAPI) => {
    try{
      let fetchedData =  await fetch('/api/procedures').then((res) => res.json());
        if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
   catch(err) {
     console.log('ProcedureSlice fetchProcedure: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
  }
} 
);

export const procedureSlice = createSlice({
  name: 'procedures',
  initialState,
  reducers: { 
  }, 

  extraReducers:  {
    [fetchProcedureData.fulfilled] : (state,action) => {
      state.procedureData = action.payload;
    }
  },
})

export default procedureSlice.reducer;