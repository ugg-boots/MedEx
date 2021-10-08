/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

 import { combineReducers } from 'redux';

 // import all reducers here
 import inventorySlicer from './inventorySlicer';
 
 // combine reducers
 const reducers = combineReducers({
   // if we had other reducers, they would go here
   inventory: inventorySlicer.reducer,
   catalog: catalogReducer,
 });
 
 // make the combined reducers available for import
 export default reducers;
 
 