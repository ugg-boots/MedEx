import { createSlice, createAsyncThunk, rejectWithValue } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

export const fetchProductName = createAsyncThunk(
  'inventory/fetchProductName',
  async (_, thunkAPI) => {
    try{
      const fetchedData =  await fetch('/api/catalog').then((res) => res.json());
        if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
   catch(err) {
     console.log('InventorySlicer fetchProductName: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
  }
} 
);

//posting data to database
export const postInventory = createAsyncThunk(
  'inventory/postInventory', 
  async(body,thunkAPI) => {
    console.log("body received", body)
    try{
      const postedBody = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
    }
    catch(err) {
      console.log('InventorySlicer postInventory: ERROR: ', err);
      if(!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { 
    allProductNames: [],
    body : {}
  },
  reducers: { 
  },
  extraReducers: {
      [fetchProductName.fulfilled] : (state,action) => {
          // console.log("fetchProductName returned ",action.payload);
          action.payload.forEach((el) => {
            state.allProductNames.push(el.product_name);
          });
      }
    },
  }
);

// export const {} = inventorySlice.actions; 
export default inventorySlice.reducer; 
