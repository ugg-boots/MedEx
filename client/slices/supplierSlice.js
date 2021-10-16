import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//created a Post Request with thunkAPI
export const postSupplier = createAsyncThunk('supplier/postSupplier', async (body, thunkAPI) => {
	try {
		const postedBody = await fetch('/api/suppliers', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(body),
		}).then((resp) => resp.json());
		return postedBody.rows[0];
	} catch (err) {
		console.log('catalogSlice postCatalog: ERROR: ', err);
		if (!err.response) throw err;
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

//created a fetch request to retrieve all supplies
export const fetchSuppliers = createAsyncThunk(
  'supplier/fetchSuppliers',
  async (userId, thunkAPI) => {
    try {
      let fetchedData =  await fetch(`/api/suppliers/${userId}`).then((res) => res.json());
      console.log('this is the fetched data from fetchSuppliers: ', fetchedData)
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

//declared the state it will take all suppliers
const initialState = {
	allSuppliers: []
};

// CreateSlice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state.
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given
export const addSupplier = createSlice({
	name: 'supplier',
	initialState, //updating the state with new data
	reducers: {},//not using reducers
	extraReducers: {
		[postSupplier.fulfilled]: (state, action) => {
			state.allSuppliers.push(action.payload)
		},
		[fetchSuppliers.fulfilled]: (state, action) => {
			action.payload.forEach(el => state.allSuppliers.push(el))
		}
	},
});
//exporting reducers as action to be dispatched
export const { supplierReducer } = addSupplier.actions;
export default addSupplier.reducer; // exporting reducer to the store
