import { apiDelete, apiGet, apiPostFile } from "./../fetch";
//photo
export async function getPhotos(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/photo`);
}
export async function addPhoto(values: any): Promise<any> {
  return await apiPostFile(`${process.env.REACT_APP_URL}/api/photo`, values);
}

export async function deletePhoto(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/photo/${id}`);
}

export async function getPhoto(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/photo/${id}`);
}
