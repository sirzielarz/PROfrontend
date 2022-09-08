import { apiDelete, apiGet, apiPost } from "./../fetch";
//group-entry
export async function getPresenceEntries(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/presence`);
}
export async function addPresenceEntry(
  groupId: number,
  childId: number,
  date: Date
): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/presence`, {
    groupId,
    childId,
    date,
  });
}
export async function deletePresenceEntry(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/presence/${id}`);
}
