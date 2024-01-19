import { API_BASE_URL } from './constants';
import { QueryParams } from '../types';
import { constructQueryString } from './utils';

export async function fetchUsers(queryParams: QueryParams) {
  const queryString = constructQueryString(queryParams);
  const res = await fetch(`${API_BASE_URL}/users${queryString}`);
  //return { data: await res.json(), status: res.status, headers: res.headers };
  return res;
}
