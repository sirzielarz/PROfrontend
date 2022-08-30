import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";

//additional-activity-teacher
export async function getActivitiesTeachers(): Promise<any> {
  return await apiGet(
    `${process.env.REACT_APP_URL}/api/additional-activity-teacher`
  );
}
export async function addActivityTeacher(
  activityId: number,
  teacherId: number
): Promise<any> {
  return await apiPost(
    `${process.env.REACT_APP_URL}/api/additional-activity-teacher`,
    {
      activityId,
      teacherId,
    }
  );
}
export async function deleteActivityTeacher(
  activityTeacherId: number
): Promise<any> {
  return await apiDelete(
    `${process.env.REACT_APP_URL}/api/additional-activity-teacher/${activityTeacherId}`
  );
}
