import { combineReducers } from 'redux';
import { isEmpty } from 'lodash';
import search from './search';
import item from './item';


export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    // Find the appropriate action function in the ActionType map object
    const reducer = reducerMap[action.type];
    const result = (reducer) ? reducer(state, action) : null;

    // If the action result is valid, apply the result to state
    return (result && !isEmpty(result)) ? Object.assign({}, state, result) : state;
  };
}

export default combineReducers({
  search,
  item
});
