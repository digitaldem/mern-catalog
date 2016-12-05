import { createReducer } from '../reducers';
import { ActionTypes } from '../constants/actiontypes';


const initialState = {
  isLoading: false,
  isSaving: false,
  original: {},
  revision: {}
};

const actionHandlers = {
  [ActionTypes.INIT_ITEM]: (state, action) => ({
    original: {},
    revision: {}
  }),

  [ActionTypes.SET_ITEM_PROPERTY]: (state, action) => ({
    revision: {
      [action.property] : action.value
    }
  }),

  [ActionTypes.REQUEST_LOAD_ITEM]: (state, action) => ({
    isLoading: true
  }),

  [ActionTypes.RECEIVE_LOAD_ITEM_SUCCESS]: (state, action) => ({
    isLoading: false,
    original: (action.response.results && action.response.results.length) ? action.response.results[0] : {},
    revision: {}
  }),

  [ActionTypes.RECEIVE_LOAD_ITEM_ERROR]: (state, action) => ({
    isLoading: false,
    original: {},
    revision: {}
  }),

  [ActionTypes.REQUEST_SAVE_ITEM]: (state, action) => ({
    isSaving: true
  }),

  [ActionTypes.RECEIVE_SAVE_ITEM_SUCCESS]: (state, action) => ({
    isSaving: false,
    original: (action.response.results && action.response.results.length) ? action.response.results[0] : {},
    revision: {}
  }),

  [ActionTypes.RECEIVE_SAVE_ITEM_ERROR]: (state, action) => ({
    isSaving: false
  })

};

export default createReducer(initialState, actionHandlers);
