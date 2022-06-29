import { createSlice, createAsyncThunk, rejectWithValue } from '@reduxjs/toolkit';

// fetch suppliers to fill drop down selector in add form
export const fetchSupplierName =  createAsyncThunk(
  'catalog/fetchSuppliers',
  async (userId, thunkAPI) => {
    try {
      let fetchedData =  await fetch(`/api/suppliers/${userId}`).then((res) => res.json());
      // console.log('this is the fetched data from fetchSupplierNAme: ', fetchedData)
        if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
    catch(err) {
     console.log('catalogSlice fetchSuppliers: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
    };
  }
  );

// fetch all products in database
export const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async (userId, thunkAPI) => {
    try {
      let fetchedData =  await fetch(`/api/catalog/${userId}`).then((res) => res.json());
      // console.log('this is the fetched data from fetchProducts: ', fetchedData)
        if(!Array.isArray(fetchedData)) fetchedData = [];
        return fetchedData;
      }
    catch(err) {
     console.log('catalogSlice fetchProducts: ERROR: ', err);
     if(!err.response) throw err;
     return thunkAPI.rejectWithValue(err.response.data);
    };
  }
  );

//posting data to database
export const postCatalog = createAsyncThunk(
  'catalog/postCatalog', 
  async(body,thunkAPI) => {
    console.log("body received", body)
    try {
      const postedBody = await fetch('/api/catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
      return postedBody.rows[0];
    }
    catch(err) {
      console.log('catalogSlice postCatalog: ERROR: ', err);
      if(!err.response) throw err;
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)


const initialState = {
  allSuppliers: [],
  allCatalogItems: [],
  body: {},
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addItem: (state, action) => {
      return ([...state, action.payload])
    },
    deleteItem: (state, action) => {

    },
  },
  extraReducers: {
    [fetchSupplierName.fulfilled]: (state, action) => {
      action.payload.forEach(el => {
        state.allSuppliers.push(el.supplier_name)
      })
    },
    [fetchProducts.fulfilled]: (state, action) => {
      action.payload.forEach(el => {
        state.allCatalogItems.push(el)
      })
    },
    [postCatalog.fulfilled]: (state, action) => {
      state.allCatalogItems.push(action.payload)
    },
  }
})

export const { addItem, deleteItem } = catalogSlice.actions;
export default catalogSlice.reducer;