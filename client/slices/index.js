import { combineReducers } from "redux";

// import all reducers here:
import catalogReducer from './catalogSlices';
import procedureReducer from './procedureSlice';
import inventoryReducer from './inventorySlice';
import authReducer from './authSlice';

const reducers = combineReducers({
  catalog: catalogReducer,
  procedures: procedureReducer,
  inventory: inventoryReducer,
  auth: authReducer
});

export default reducers