import { apiGet, apiPost } from "./fetch";

const API_URL = "http://localhost:8080";

// you can set Promise<YourType>
export function loginUser(email: string, password: string): Promise<any> {
  return apiPost(`${API_URL}/login?username=${email}&password=${password}`);
}

export function getGroupTeacher(): Promise<any> {
  return apiGet(`${API_URL}/api/group-teacher/`);
}
