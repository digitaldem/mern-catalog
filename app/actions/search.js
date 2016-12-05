import { isEmpty } from 'lodash';
import { ActionTypes } from '../constants/actiontypes';


export function searchItems() {
  console.debug('searchItems');
  return (dispatch, getState) =>
    dispatch({
      [ActionTypes.CALL_API]: {
        types: [
          ActionTypes.REQUEST_SEARCH_ITEMS,
          ActionTypes.RECEIVE_SEARCH_ITEMS_SUCCESS,
          ActionTypes.RECEIVE_SEARCH_ITEMS_ERROR],
        endpoint: 'items.json'
      }
    });
}
