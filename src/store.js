import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import habitsReducer from './reducers/habitReducer';
import authReducer from './reducers/authReducers';
import areaReducer from './reducers/areaReducer';

const rootReducer = combineReducers({
  habits: habitsReducer,
  auth: authReducer,
  area: areaReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
