import { PrivateMessageAPI } from "../../interfaces/Entities";
import { apiDelete, apiGet, apiPost } from "./../fetch";
//photo
export async function getPrivateMessages(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/private-message`);
}
export async function addPrivateMessage(
  values: PrivateMessageAPI
): Promise<any> {
  return await apiPost(
    `${process.env.REACT_APP_URL}/api/private-message`,
    values
  );
}

export async function deletePrivateMessage(id: number): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/private-message/${id}`
  );
}

export async function getPrivateMessage(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/private-message/${id}`);
}
