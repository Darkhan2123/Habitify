// src/reducers/index.js
import { combineReducers } from 'redux';
import areaReducer from './areaReducer';
// import other reducers

const rootReducer = combineReducers({
  // other reducers,
  area: areaReducer,
});

export default rootReducer;
