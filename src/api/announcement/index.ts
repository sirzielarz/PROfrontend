import {
    APIAnnouncement
} from "../../interfaces/Entities";
import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//group-entry
export async function getAnnouncements(): Promise<any> {
    return await apiGet(
        `${process.env.REACT_APP_URL}/api/announcement`
    );
}
export async function addAnnouncement(
    values: APIAnnouncement
): Promise<any> {
    return await apiPost(
        `${process.env.REACT_APP_URL}/api/announcement`,
        values
    );
}

export async function updateAnnouncement(
    id: number,
    values: APIAnnouncement
): Promise<any> {
    return await apiPut(
        `${process.env.REACT_APP_URL}/api/announcement/${id}`,
        values
    );
}

export async function deleteAnnouncement(
    id: number
): Promise<any> {
    return await apiDelete(
        `${process.env.REACT_APP_URL}/api/announcement/${id}`
    );
}

export async function getAnnouncement(id: number): Promise<any> {
    return await apiGet(
        `${process.env.REACT_APP_URL}/api/announcement/${id}`
    );
}
