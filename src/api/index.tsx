import { apiPost } from "./fetch";

export const API_URL = "http://localhost:8080";

// you can set Promise<YourType>
export async function loginUser(email: string, password: string): Promise<any> {
  try {
    const result = await apiPost(
      `${process.env.REACT_APP_URL}/login?username=${email}&password=${password}`
    );
    return result;
  } catch (err) {
    console.error(err);
  }
}
