import { isEmpty, mapValues, isEqualWith } from 'lodash';
import querystring from 'querystring';


export function appendUrlParameters(url, params) {
  if (isEmpty(params)) {
    return url;
  }

  const joinedParams = mapValues(params, val =>
    (val instanceof Array) ? val.join(',') : val
  );
  return `${url}?${querystring.stringify(joinedParams)}`;
}

export function isEqual(a, b) {
  return isEqualWith(a, b, (a, b) =>
    ((typeof a === 'function' || typeof b === 'function') ? true : undefined)
  );
}
