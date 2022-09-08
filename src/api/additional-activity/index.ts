import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
export async function deleteActivityItem(activityId: number): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/additional-activity/${activityId}`
  );
}
export async function createActivity(values: any): Promise<any> {
  return await apiPost(
    `${process.env.REACT_APP_URL}/api/additional-activity/`,
    values
  );
}

//additional-activity
export async function editActivityName(
  activityId: number,
  newActivityName: string
): Promise<any> {
  return await apiPut(
    `${process.env.REACT_APP_URL}/api/additional-activity/${activityId}`,
    {
      activityName: newActivityName,
    }
  );
}
export async function getActivity(activityId: number): Promise<any> {
  return await apiGet(
    `${process.env.REACT_APP_URL}/api/additional-activity/${activityId}`
  );
}
