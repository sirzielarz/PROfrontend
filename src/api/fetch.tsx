import { Configuration } from "./Configuration";

export function apiGet(uri: string) {
  return fetchWrapper(uri);
}

export function apiPost(uri: string, body?: any) {
  return fetchWrapper(uri, "POST", body);
}

export function apiPostFile(uri: string, body?: any) {
  const flag = true;
  const formData = new FormData();
  formData.append("file", body.file, body.file.fileName);
  formData.append("id", body.id);
  return fetchWrapper(uri, "POST", formData, flag);
}

export function apiPut(uri: string, body?: any) {
  return fetchWrapper(uri, "PUT", body);
}

export function apiDelete(uri: string, body?: any) {
  return fetchWrapper(uri, "DELETE", body);
}
//fetcher for use with swr
export const fetcher = async (url: string) => {
  const token = Configuration.getInstance().getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  ////////////////////////////////////////////
  const res = await fetch(url, { headers });

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.message = await res.json();
    throw error;
  }

  return res.json();
  /////////////////////////////////////////

  //   return fetch(url, {
  //     headers,
  //   }).then((r) => r.json());
};

function fetchWrapper(
  uri: string,
  method: string = "GET",
  body?: any,
  flag: boolean = false
) {
  const token = Configuration.getInstance().getToken();
  const headers: HeadersInit = {};
  if (method === "GET") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (flag) {
    headers["Accept"] = "application/json";
    delete headers["Content-Type"];
  }

  return fetch(uri, {
    method,
    body: flag ? body : JSON.stringify(body),
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
