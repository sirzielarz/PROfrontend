import { apiGet, apiPost } from "./fetch";

const API_URL = "http://localhost:8080";

// you can set Promise<YourType>
export async function loginUser(email: string, password: string): Promise<any> {
  try {
    const result = await apiPost(
      `${API_URL}/login?username=${email}&password=${password}`
    );
    return result;
  } catch (err) {
    console.log("ErrorApi");
    console.error(err);
    throw new Error("wrong email or password");
  }
}

export function getGroupTeacher(): Promise<any> {
  return apiGet(`${API_URL}/api/group-teacher/`);
}
