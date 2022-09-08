import { apiDelete, apiGet, apiPost } from "./../fetch";
//group-entry
export async function getGroupEntries(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/group-entry`);
}
export async function addGroupEntry(
  groupId: number,
  childId: number
): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/group-entry`, {
    groupId,
    childId,
  });
}
export async function deleteGroupEntry(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/group-entry/${id}`);
}
