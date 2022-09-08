import { APIPhotoAlbum } from "../../interfaces/Entities";
import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//group-entry
export async function getPhotoAlbums(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/photo-album`);
}
export async function addPhotoAlbum(values: APIPhotoAlbum): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/photo-album`, values);
}

export async function updatePhotoAlbum(
  id: number,
  values: APIPhotoAlbum
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/photo-album/${id}`,
    values
  );
}

export async function deletePhotoAlbum(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/photo-album/${id}`);
}

export async function getPhotoAlbum(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/photo-album/${id}`);
}
