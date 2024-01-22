import { API_BASE_URL, LIMIT_20 } from './constants';
import { QueryParams } from '../types';
import { constructQueryString } from './utils';

export async function fetchUsers(
  path: string = 'users',
  queryParams: QueryParams = {}
) {
  //  if no limit in URL - set limit = 20
  queryParams.limit = queryParams.limit || LIMIT_20;
  const queryString = constructQueryString(queryParams);
  console.log(`${API_BASE_URL}${path}${queryString}`);
  const res = await fetch(`${API_BASE_URL}${path}${queryString}`);
  //return { data: await res.json(), status: res.status, headers: res.headers };
  return res;
}
