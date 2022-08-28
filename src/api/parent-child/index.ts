import { apiDelete, apiGet, apiPost, apiPut } from "./../fetch";
//parent-child
export async function getParentChildEntries(): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent-child`);
}
export async function getParentChildEntry(id: number): Promise<any> {
  return await apiGet(`${process.env.REACT_APP_URL}/api/parent-child/${id}`);
}

export async function addParentChildEntry(
  parentId: number,
  childId: number
): Promise<any> {
  return await apiPost(`${process.env.REACT_APP_URL}/api/parent-child`, {
    parentId,
    childId,
  });
}
export async function deleteParentChildEntry(id: number): Promise<any> {
  return await apiDelete(`${process.env.REACT_APP_URL}/api/parent-child/${id}`);
}
