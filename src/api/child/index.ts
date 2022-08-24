import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";

export async function getChildren(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/child/`);
}
