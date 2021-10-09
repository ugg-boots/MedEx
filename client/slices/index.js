import { combineReducers } from "redux";

// import all reducers here:
import catalogReducer from './catalogSlices';
import inventoryReducer from './inventorySlice';

const reducers = combineReducers({
  catalog: catalogReducer,
  inventory: inventoryReducer

});

export default reducers