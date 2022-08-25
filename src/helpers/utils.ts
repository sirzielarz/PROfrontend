import {
  ChildrenDTO,
  IPerson,
  ITeacher,
  TeachersDTO,
  GroupsDTO,
  IActivity,
  additionalActivityDTO,
  additionalActivitiesDTO,
} from "../interfaces/Entities";
export interface IItems {
  id: string;
  value: string;
}

export function sortByValue(a: IItems, b: IItems) {
  const x = a.value.toLowerCase();
  const y = b.value.toLowerCase();
  return ("" + x).localeCompare("" + y);
}

export function sortTeachers(a: TeachersDTO, b: TeachersDTO) {
  const result = a.teacher.surname.localeCompare(b.teacher.surname);
  return result !== 0 ? result : a.teacher.name.localeCompare(b.teacher.name);
}

export function sortChildren(a: ChildrenDTO, b: ChildrenDTO) {
  const result = a.child.surname.localeCompare(b.child.surname);
  return result !== 0 ? result : a.child.name.localeCompare(b.child.name);
}

export function sortGroups(a: GroupsDTO, b: GroupsDTO) {
  const result = a.kindergartenGroup.groupName.localeCompare(
    b.kindergartenGroup.groupName
  );
  return result;
}
export function sortActivities(
  a: additionalActivitiesDTO,
  b: additionalActivitiesDTO
) {
  const result = a.additionalActivity.activityName.localeCompare(
    b.additionalActivity.activityName
  );
  return result;
}
