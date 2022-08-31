import {
  ChildrenDTO,
  IPerson,
  ITeacher,
  TeachersDTO,
  GroupsDTO,
  IActivity,
  additionalActivityDTO,
  additionalActivitiesDTO,
  AuthorizationChildToPickUpDTO,
} from "../interfaces/Entities";
export interface IItems {
  id: string;
  value: string;
}

export interface IItemsToSelect {
  value: string;
  label: string;
}

export function sortByValue(a: IItems, b: IItems) {
  const x = a.value.toLowerCase();
  const y = b.value.toLowerCase();
  return ("" + x).localeCompare("" + y);
}

export function sortByValueToSelect(a: IItemsToSelect, b: IItemsToSelect) {
  const x = a.label.toLowerCase();
  const y = b.label.toLowerCase();
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

export function sortAuthorized(
  a: AuthorizationChildToPickUpDTO,
  b: AuthorizationChildToPickUpDTO
) {
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
/**
 *  pesel validation based on https://www.modestprogrammer.pl/walidacja-pesel-w-javascript
 * @param pesel string
 * @returns boolean
 */
export function validatePesel(pesel: string): boolean {
  let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  let controlNumber = parseInt(pesel.substring(10, 11));
  //loop
  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(pesel.substring(i, i + 1)) * weights[i];
  }
  sum = sum % 10;
  return (10 - sum) % 10 === controlNumber;
}

export function getPrettyDate(date: Date | null) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
