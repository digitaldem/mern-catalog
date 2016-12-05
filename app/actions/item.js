import { ActionTypes } from '../constants/actiontypes';


export function initItem() {
  console.debug('initItem');
  return (dispatch, getState) =>
    dispatch({
      type: ActionTypes.INIT_ITEM
    });
}

export function setItemProperty(property, value) {
  console.debug('setItemProperty');
  return (dispatch, getState) =>
    dispatch({
      type: ActionTypes.SET_ITEM_PROPERTY,
      property,
      value
    });
}

export function loadItem(id) {
  console.debug('loadItem');
  return (dispatch, getState) =>
    dispatch({
      [ActionTypes.CALL_API]: {
        types: [
          ActionTypes.REQUEST_LOAD_ITEM,
          ActionTypes.RECEIVE_LOAD_ITEM_SUCCESS,
          ActionTypes.RECEIVE_LOAD_ITEM_ERROR],
        endpoint: `items/${id}.json`
      }
    });
}

export function saveItem(id) {
  console.debug('saveItem');
  return (dispatch, getState) =>
    dispatch({
      [ActionTypes.CALL_API]: {
        types: [
          ActionTypes.REQUEST_SAVE_ITEM,
          ActionTypes.RECEIVE_SAVE_ITEM_SUCCESS,
          ActionTypes.RECEIVE_SAVE_ITEM_ERROR],
        params: getState().item.revision,
        endpoint: (id) ? `items/${id}.json` : 'items.json',
        verb: (id) ? 'PATCH' : 'POST'
      }
    });
}
