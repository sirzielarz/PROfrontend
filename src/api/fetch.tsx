import { Configuration } from "./Configuration";

export function apiGet(uri: string) {
  return fetchWrapper(uri);
}

export function apiPost(uri: string, body?: any) {
  return fetchWrapper(uri, "POST", body);
}

export function apiPut(uri: string, body?: any) {
  return fetchWrapper(uri, "PUT", body);
}

export function apiDelete(uri: string, body?: any) {
  return fetchWrapper(uri, "DELETE", body);
}

function fetchWrapper(uri: string, method: string = "GET", body?: any) {
  const token = Configuration.getInstance().getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(uri, {
    method,
    body: JSON.stringify(body),
    headers,
  }).then(handleResponse);
}

function handleResponse(response: Response) {
  return response.text().then((text) => {
    let json: any;
    try {
      json = JSON.parse(text);
    } catch (ignore) {}

    if (response.ok) {
      return json || text;
    }
    // handle errors
    let error: string;
    if (json && json.errors) {
      error = json.errors[0].msg;
    } else if (text) {
      error = text;
    } else {
      error = String(response.status);
    }

    return Promise.reject(error);
  });
}
