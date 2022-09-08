import { APIAuthorizationToPickup } from "../../interfaces/Entities";
import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//group-entry
export async function getAuthorizationToPickupEntries(): Promise<any> {
  return await apiGet(
    `${process.env.REACT_APP_URL}/api/authorization-to-pickup`
  );
}
export async function addAuthorizationToPickupEntry(
  values: APIAuthorizationToPickup
): Promise<any> {
  return await apiPost(
    `${process.env.REACT_APP_URL}/api/authorization-to-pickup`,
    values
  );
}

export async function updateAuthorizationToPickupEntry(
  id: number,
  values: APIAuthorizationToPickup
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/authorization-to-pickup/${id}`,
    values
  );
}

export async function deleteAuthorizationToPickupEntry(
  id: number
): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/authorization-to-pickup/${id}`
  );
}

export async function getAuthorizationToPickupEntry(id: number): Promise<any> {
  return await apiGet(
    `${process.env.REACT_APP_URL}/api/authorization-to-pickup/${id}`
  );
}
