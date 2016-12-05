import FormData from 'form-data';
import { __API_URL__ } from '../constants';
import { ActionTypes } from '../constants/actiontypes';
import { appendUrlParameters } from '../utilities';


function pull(verb, url, params = {}) {
  const headers = { Accept: 'application/json' };
  const fullUrl = appendUrlParameters(url, params);

  console.debug(`[${verb}] ${fullUrl}`);
  return fetch(fullUrl, {
    method: verb,
    headers
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      const result = {
        statusCode: response.status,
        totalCount: json.totalCount,
        results: json.results
      };
      if (response.ok) {
        return Promise.resolve(result);
      }
      return Promise.reject(result);
    }
  );
}

function push(verb, url, params = {}) {
  let headers;
  let body;
  if (params instanceof Buffer || params instanceof File) {
    headers = { Accept: 'application/json' };
    body = new FormData();
    body.append(params.name, params);
  } else {
    headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
    body = JSON.stringify(params || {});
  }

  console.debug(`[${verb}] ${url} => ${body}`);
  return fetch(url, {
    method: verb,
    headers,
    body
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      const result = {
        statusCode: response.status,
        totalCount: json.totalCount,
        results: json.results
      };
      if (!response.ok) {
        result.exception = json.exception || 'Unhandled API Error';
        return Promise.reject(result);
      }
      return Promise.resolve(result);
    }
  );
}

function callApi(verb, apiUrl, endpoint, params, actionParams) {
  const url = (endpoint.indexOf(apiUrl) === -1) ? apiUrl + endpoint : endpoint;
  if (verb && (verb.toLowerCase() === 'post' || verb.toLowerCase() === 'put' || verb.toLowerCase() === 'patch' || verb.toLowerCase() === 'delete')) {
    return push(verb.toUpperCase(), url, params);
  }
  return pull('GET', url, params);
}

export default store => next => action => {
  let callAPI;
  let apiUrl;
  if (action[ActionTypes.CALL_API]) {
    callAPI = action[ActionTypes.CALL_API];
    apiUrl = __API_URL__;
  } else {
    return Promise.resolve(next(action));
  }

  let { endpoint } = callAPI;
  const { params, verb, types, actionParams } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types: [REQUEST, RECEIVE_SUCCESS, RECEIVE_ERROR]');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[ActionTypes.CALL_API];
    return finalAction;
  }

  const [requestActionType, successActionType, failureActionType] = types;
  next(actionWith({ ...actionParams, type: requestActionType }));

  return callApi(verb, apiUrl, endpoint, params, actionParams)
    .then(response => next(actionWith({
      ...actionParams,
      type: successActionType,
      response
    })), response => next(actionWith({
      ...actionParams,
      type: failureActionType,
      response
    }))
  );
};
