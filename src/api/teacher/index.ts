import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
import { APITeacherPOST, APITeacherPUT } from "../../interfaces/Entities";

//teacher
//@todo set ITeacher type
export async function getTeachers(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/teacher/`);
}
export async function deleteTeacher(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/teacher/${id}`);
}
export async function createTeacher(values: APITeacherPOST): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/teacher/`, values);
}

export async function resetTeacherPassword(
  id: number,
  newPassword: string
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/teacher/reset-password/${id}`,
    newPassword
  );
}

export async function editTeacher(
  id: number,
  values: APITeacherPUT
): Promise<any> {
  return await apiPut(`${process.env.REACT_APP_URL}/api/teacher/${id}`, values);
}
export async function getTeacher(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/teacher/${id}`);
}
export async function updateMyDataTeacherPassword(
  oldPassword: string,
  newPassword: string
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/teacher/my-data/change-password`,
    { oldPassword: oldPassword, newPassword: newPassword }
  );
}

export async function updateMyDataTeacher(values: APITeacherPUT): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/teacher/my-data`,
    values
  );
}
