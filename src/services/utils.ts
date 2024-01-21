import { QueryParams } from '../types';

export function constructQueryString(queryParams: QueryParams) {
  return `${Object.entries(queryParams).reduce((query, [key, value], index) => {
    return index > 0 ? `${query}&${key}=${value}` : `?${key}=${value}`;
  }, '')}`;
}

export function constructQueryParamsObject(queryString: string): QueryParams {
  if (!queryString) return {};
  const paramsObject: QueryParams = {};
  if (queryString[0] === '?') queryString = queryString.slice(1);
  queryString
    .split('&')
    .map((keyValue) => keyValue.split('='))
    .forEach(([key, value]) => {
      paramsObject[key as keyof QueryParams] = value;
    });

  return paramsObject;
}
