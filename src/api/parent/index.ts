import { apiDelete, apiGet, apiPost, apiPut, fetcher } from "./../fetch";
import {
  APIParentPOST,
  APIParentPUT,
  ChangePassword,
  ChangePasswordAPI,
} from "../../interfaces/Entities";
import useSWR from "swr";
//parent
export async function getParents(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent/`);
}
export async function deleteParent(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/parent/${id}`);
}
export async function createParent(values: APIParentPOST): Promise<any> {
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

export async function updateMyDataParentPassword(
  values: ChangePasswordAPI
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/parent/my-data/change-password`,
    values
  );
}

export async function updateMyDataParent(values: APIParentPUT): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/parent/my-data`,
    values
  );
}

export async function editParent(
  id: number,
  values: APIParentPUT
): Promise<any> {
  return await apiPut(`${process.env.REACT_APP_URL}/api/parent/${id}`, values);
}

export async function getParent(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent/${id}`);
}

export function SWR_getParents() {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_URL}/api/parent`,
    fetcher
  );

  return {
    items: data,
    error,
  };
}
