import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//additional-activity-entry
export async function getActivityEntries(): Promise<any> {
  return await apiGet(
    `${process.env.REACT_APP_URL}/api/additional-activity-entry`
  );
}
export async function addActivityEntry(
  activityId: number,
  childId: number
): Promise<any> {
  return await apiPost(
    `${process.env.REACT_APP_URL}/api/additional-activity-entry`,
    {
      activityId,
      childId,
    }
  );
}
export async function deleteActivityEntry(id: number): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/additional-activity-entry/${id}`
  );
}
