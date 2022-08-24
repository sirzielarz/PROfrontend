import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//parent
export async function getParents(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent/`);
}
