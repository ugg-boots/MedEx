import { combineReducers } from "redux";

// import all reducers here:
import catalogReducer from './catalogSlices';

const reducers = combineReducers({
  catalog: catalogReducer

});

export default reducers