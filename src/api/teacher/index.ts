import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";

//teacher
export async function getTeachers(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/teacher/`);
}
