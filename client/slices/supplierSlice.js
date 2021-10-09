import { createSlice } from '@reduxjs/toolkit';

// CreateSlice accepts an initial state, an object full of reducer functions, and a slice "name". It automatically
// generates action creators and action types that correspond to the reducers and state.
// The slice object is passed to createReducer, so reducers may safely 'mutate' the state they are given
export const addSupplier = createSlice({
	name: 'supplier',
	initialState: [], //updating the state with new data
	reducers: {
		SupplierReducer: (state, action) => {
			// state.supplier_name = action.payload.supplier_name;
			return [...state, action.payload];
		},
	},
});
console.log(addSupplier)

//exporting reducers as action to be dispatched 
export const { SupplierReducer } = addSupplier.actions;

export default addSupplier.reducer;// exporting reducer to the store
