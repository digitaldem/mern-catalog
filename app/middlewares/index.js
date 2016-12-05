import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import api from './api';
import logger from './logger';
import devtools from './devtools';
import rootReducer from '../reducers';
import { __DEBUG__ } from '../constants';


export function configureDebugStore(initialState = { }) {
  return compose(applyMiddleware(thunk, api, logger), devtools)(createStore)(rootReducer, initialState);
}

export function configureProdStore(initialState = { }) {
  return compose(applyMiddleware(thunk, api))(createStore)(rootReducer, initialState);
}

export default (__DEBUG__) ? configureDebugStore : configureProdStore;
