import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
import {
  APIResetPassword,
  APIParentPOST,
  APIParentPUT,
  IParent,
} from "../../interfaces/Entities";
//parent
export async function getParents(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent/`);
}
export async function deleteParent(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/parent/${id}`);
}
export async function createParent(values: APIParentPOST): Promise<any> {
  console.log("setting Parent: ", values);
  return await apiPost(`${process.env.REACT_APP_URL}/api/parent/`, values);
}

export async function resetParentPassword(
  id: number,
  newPassword: string
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/parent/reset-password/${id}`,
    newPassword
  );
}

export async function editParent(
  id: number,
  values: APIParentPUT
): Promise<any> {
  console.log("updateding Parent: ", values);
  return await apiPut(`${process.env.REACT_APP_URL}/api/parent/${id}`, values);
}
export async function getParent(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent/${id}`);
}
