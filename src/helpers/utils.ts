import {
  ChildrenDTO,
  IPerson,
  ITeacher,
  TeachersDTO,
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
