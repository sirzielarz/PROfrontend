export interface Teacher {
  teacher: {
    id: number;
    name: string;
    surname: string;
  };
}

export interface Child {
  child: {
    id: number;
    name: string;
    surname: string;
  };
}

export interface IGroup {
  id: number;
  groupName: string;
  teachers: Teacher[];
  children: Child[];
}
