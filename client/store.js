import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
// export const store = createStore(reducers, composeWithDevTools());
// console.log('default store', store.getState());


export default configureStore({
  reducer: {

  }
})