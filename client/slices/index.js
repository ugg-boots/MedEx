import { combineReducers } from "redux";
// import all reducers here:
import supplierReducer from './supplierSlice'
import catalogReducer from './catalogSlices';
import procedureReducer from './procedureSlice';
import inventoryReducer from './inventorySlice';

const reducers = combineReducers({
  catalog: catalogReducer,
  procedures: procedureReducer,
  inventory: inventoryReducer,
  supplier:supplierReducer
});

export default reducers