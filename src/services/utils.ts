import { QueryParams } from '../types';

export function constructQueryString(queryParams: QueryParams) {
  return `${Object.entries(queryParams).reduce((query, [key, value], index) => {
    return index > 0 ? `${query}&${key}=${value}` : `?${key}=${value}`;
  }, '')}`;
}
