import { combineReducers } from "redux";
// import all reducers here:
import supplierReducer from './supplierSlice'
import catalogReducer from './catalogSlices';

export const reducers = combineReducers({
  catalog: catalogReducer,
  supplier: supplierReducer

});

export default reducers