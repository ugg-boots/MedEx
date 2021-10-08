import { combineReducers } from "redux";

// import all reducers here:
import catalogReducer from './catalogReducer';

const reducers = combineReducers({
  catalog: catalogReducer
});

export default reducers