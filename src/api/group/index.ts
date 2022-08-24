import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//group
export async function getGroups(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/group/`);
}
export async function getGroup(groupId: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/group/${groupId}`);
}
export async function editGroupName(
  groupId: number,
  newGroupName: string
): Promise<any> {
  return await apiPut(`${process.env.REACT_APP_URL}/api/group/${groupId}`, {
    groupName: newGroupName,
  });
}
export async function deleteGroupItem(groupId: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/group/${groupId}`);
}
export async function createGroup(values: any): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/group/`, values);
}
