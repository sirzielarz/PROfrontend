import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";

//group-teacher
export async function getTeachersGroups(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/group-teacher`);
}
export async function addGroupTeacher(
  groupId: number,
  teacherId: number
): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/group-teacher`, {
    groupId,
    teacherId,
  });
}
export async function deleteGroupTeacher(groupTeacherId: number): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/group-teacher/${groupTeacherId}`
  );
}
