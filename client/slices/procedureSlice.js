import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

const initialState = {
  procedureData: [],
  productData: [],

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

export const fetchProductData = createAsyncThunk(
  'procedures/fetchProducts',
  async (_, thunkAPI) => {
    try{
      let fetchedData =  await fetch('/api/catalog').then((res) => res.json());
        if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
   catch(err) {
     console.log('ProcedureSlice fetchProducts: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
  }
} 
);

export const postProcedure = createAsyncThunk(
  'catalog/postProcedure', 
  async(body,thunkAPI) => {
    try {
      const postedBody = await fetch('/api/procedures', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json());
      return postedBody;
    }
    catch(err) {
      console.log('ProcedureSlice postProcedure ERROR: ', err);
      if(!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const procedureSlice = createSlice({
  name: 'procedures',
  initialState,
  reducers: { 
    handleProductQuantityChange: (state, action) => {
      state.productData[action.payload.index].quantity = action.payload.value;
    }
  }, 

  extraReducers:  {
    [fetchProcedureData.fulfilled] : (state,action) => {
      state.procedureData = action.payload;
    },
    [fetchProductData.fulfilled] : (state,action) => {
      const productArray = [];
      console.log(action.payload);
      action.payload.forEach(product => {
        const newObj = {};
        newObj.productName = product.product_name;
        newObj.productID = product.product_id;
        newObj.quantity = '';
        productArray.push(newObj);
      });
      state.productData = productArray;
    },
    [postProcedure.fulfilled]: (state, action) => {
      action.payload.forEach(row => {
        state.procedureData.push(row)
      })
    },
  }
})

export const { handleProductQuantityChange } = procedureSlice.actions;

export default procedureSlice.reducer;