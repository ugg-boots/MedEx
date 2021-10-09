import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// we are adding composeWithDevTools here to get easy access to the Redux dev tools
// export const store = createStore(reducers, composeWithDevTools());
// console.log('default store', store.getState());


// import all reducers here
import inventoryReducer from './slices/inventorySlice';

// make the combined reducers available for import

export default configureStore({
  reducer: {
    inventory: inventoryReducer,
  }
})
