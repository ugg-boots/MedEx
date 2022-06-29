import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create slice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state. 
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given

const initialState = {
  procedureData: [],
  productData: [],
  isProcedureDeleteModalOpen: false, 
  deletedProcedureName: ""

}

export const fetchProcedureData = createAsyncThunk(
  'procedures/fetchProcedures',
  async (userId, thunkAPI) => {
    try{
      let fetchedData =  await fetch(`/api/procedures/${userId}`).then((res) => res.json());
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
  async (userId, thunkAPI) => {
    try{
      let fetchedData =  await fetch(`/api/catalog/${userId}`).then((res) => res.json());
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
      console.log("body",body)
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
);

export const deleteProcedure = createAsyncThunk(
  'catalog/deleteProcedure', 
  async(procedure_id,thunkAPI) => {
    try {
      const deletedBody = await fetch(`/api/procedures/${procedure_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON'
        }
      })
        .then(resp => resp.json());
      return deletedBody;
    }
    catch(err) {
      console.log('ProcedureSlice deleteProcedure ERROR: ', err);
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
    },
    resetProductData: (state) => {
      state.productData.forEach(product => {
        product.quantity = '';
      });
    },
    setModalOpen: (state, action) => {
      state.deletedProcedureName = action.payload;
      state.isProcedureDeleteModalOpen = true;
    },
    setModalClose: (state,action) =>{
      state.isProcedureDeleteModalOpen = false; 
    }
  }, 

  extraReducers:  {
    [fetchProcedureData.fulfilled] : (state,action) => {
      state.procedureData = action.payload;
    },
    [fetchProductData.fulfilled] : (state,action) => {
      const productArray = [];
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
    [deleteProcedure.fulfilled]: (state,action) => {
      const {procedure_id} = action.payload;
      const newProcedureData = [];
      for(let i = 0; i < state.procedureData.length; i++) {
        if (state.procedureData[i].procedure_id !== +procedure_id) {
          newProcedureData.push(state.procedureData[i])
        }
      }
      state.procedureData = [...newProcedureData];
    }
  }
})

export const { handleProductQuantityChange, resetProductData, setModalOpen, setModalClose } = procedureSlice.actions;

export default procedureSlice.reducer;