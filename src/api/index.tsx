import { apiDelete, apiGet, apiPost, apiPut } from "./fetch";
import { Group } from "../interfaces/RecordEntities";
import { GroupDTO, TeacherDTO } from "../interfaces/Entities";

const API_URL = "http://localhost:8080";

// you can set Promise<YourType>
export async function loginUser(email: string, password: string): Promise<any> {
  try {
    const result = await apiPost(
      `${API_URL}/login?username=${email}&password=${password}`
    );
    return result;
  } catch (err) {
    console.error(err);
  }
}

//group-teacher
export async function getGroupTeacher(): Promise<any> {
  return await apiGet(`${API_URL}/api/group-teacher/`);
}
//parents
export async function getParents(): Promise<any> {
  return await apiGet(`${API_URL}/api/parent/`);
}
//group
export async function getGroups(): Promise<any> {
  return await apiGet(`${API_URL}/api/group/`);
}

export async function editGroupName(
  groupId: number,
  newGroupName: string
): Promise<any> {
  return await apiPut(`${API_URL}/api/group/${groupId}`, {
    groupName: newGroupName,
  });
}
//group
export async function deleteGroupItem(groupId: number): Promise<any> {
  return await apiDelete(`${API_URL}/api/group/${groupId}`);
}
//group
export async function createGroup(values: any): Promise<any> {
  return await apiPost(`${API_URL}/api/group/`, values);
}
//children
export async function getChildren(): Promise<any> {
  return await apiGet(`${API_URL}/api/child/`);
}
