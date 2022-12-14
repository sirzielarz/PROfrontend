import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
import { APIChild } from "../../interfaces/Entities";
//child
export async function getChildren(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/child/`);
}

export async function getChild(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/child/${id}`);
}

export async function createChild(values: APIChild): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/child/`, values);
}

export async function editChild(id: number, values: APIChild): Promise<any> {
  return await apiPut(`${process.env.REACT_APP_URL}/api/child/${id}`, values);
}

export async function deleteChild(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/child/${id}`);
}
