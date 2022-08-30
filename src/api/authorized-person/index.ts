import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
import {
  APIAuthorizedPerson,
  IAuthorizedPerson,
} from "../../interfaces/Entities";
//authorized-person
export async function getAuthorizedPersons(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/authorized-person/`);
}
export async function deleteAuthorizedPerson(id: number): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/authorized-person/${id}`
  );
}
export async function createAuthorizedPerson(
  values: APIAuthorizedPerson
): Promise<any> {
  return await apiPost(
    `${process.env.REACT_APP_URL}/api/authorized-person/`,
    values
  );
}

export async function editAuthorizedPerson(
  id: number,
  values: APIAuthorizedPerson
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/authorized-person/${id}`,
    values
  );
}
export async function getAuthorizedPerson(id: number): Promise<any> {
  return await apiGet(
    `${process.env.REACT_APP_URL}/api/authorized-person/${id}`
  );
}
