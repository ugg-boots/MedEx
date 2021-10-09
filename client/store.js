// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import supplierSlice from './slices/supplierSlice';

//configuring/adding the slice file to the store
export default configureStore({
	reducer: {
		supplier: supplierSlice,
	},
});
