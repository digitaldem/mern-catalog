import { createReducer } from '../reducers';
import { ActionTypes } from '../constants/actiontypes';


const initialState = {
  isSearching: false,
  items: []
};

const actionHandlers = {
  [ActionTypes.REQUEST_SEARCH_ITEMS]: (state, action) => ({
    isSearching: true
  }),

  [ActionTypes.RECEIVE_SEARCH_ITEMS_SUCCESS]: (state, action) => ({
    isSearching: false,
    items: action.response.results
  }),

  [ActionTypes.RECEIVE_SEARCH_ITEMS_ERROR]: (state, action) => ({
    isSearching: false,
    items: []
  })
};

export default createReducer(initialState, actionHandlers);
