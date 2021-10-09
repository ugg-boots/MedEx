import { combineReducers } from "redux";

// import all reducers here:
import catalogReducer from './catalogSlices';
import procedureReducer from './procedureSlice';

const reducers = combineReducers({
  catalog: catalogReducer,
  procedures: procedureReducer
});

export default reducers