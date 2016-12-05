import expect from 'expect';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from '../app/middlewares/api';


export default function mockStore(expectedActionChain, initialState = { }, middlewares = [thunk, apiMiddleware]) {
  if (!expectedActionChain)
    throw new Error('expectedActionChain should be an expected action or an array of actions.');
  else if (!Array.isArray(expectedActionChain))
    expectedActionChain = [expectedActionChain];

  function mockStoreWithoutMiddleware() {
    const self = {
      getState() {
        return typeof initialState === 'function' ?
          initialState() :
          initialState;
      },

      dispatch(action) {
        const expectedAction = expectedActionChain.shift();
        try {
          expect(action.type).toEqual(expectedAction.type);
          // console.log(`${expectedAction.type} Promise Resolved`);
          return Promise.resolve(action);
        } catch (e) {
          // console.log(`${expectedAction.type} Promise Rejected`);
          return Promise.reject(e);
        }
      }
    };
    return self;
  }

  return applyMiddleware(...middlewares)(mockStoreWithoutMiddleware)();
}
