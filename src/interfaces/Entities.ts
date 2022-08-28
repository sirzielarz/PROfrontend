export interface IEntity {
  id: number;
}
export interface IPerson extends IEntity {
  name: string;
  surname: string;
}

export interface ChildrenDTO {
  child: IPerson;
  teachers: IPerson;
}
export interface TeachersDTO {
  teacher: IPerson;
}

export interface privateMessageDTO extends IEntity {
  teacher: IPerson;
  parent: IPerson;
  subject: string;
  messageText: string;
  sender: string;
}
export interface additionalActivityDTO extends IEntity {
  activityName: string;
}
export interface additionalActivitiesDTO extends IEntity {
  additionalActivity: additionalActivityDTO;
  activityName: string;
}
// api/additional-activity

export interface IActivity extends IEntity {
  activityName: string;
  teachers: TeachersDTO[];
  children: ChildrenDTO[];
}
//api/additional-activity-entry
export interface IActivityEntry extends IEntity {
  additionalActivity: {
    id: number;
    groupName: string;
    teachers: TeachersDTO[];
  };
  child: IPerson;
}
//api/additional-activity-teacher
export interface IActivityTeacher extends IEntity {
  additionalActivity: {
    id: number;
    activityName: string;
  };
  teacher: IPerson;
}

// api/group
export interface IGroup extends IEntity {
  groupName: string;
  teachers: TeachersDTO[];
  children: ChildrenDTO[];
  announcements?: AnnouncementDTO[];
}
//api/group-entry
export interface IGroupEntry extends IEntity {
  kindergartenGroup: {
    id: number;
    groupName: string;
    teachers: TeachersDTO[];
  };
  child: IPerson;
}

//api/parent-child
export interface IParentChild extends IEntity {
  parent: IPerson;
  child: IPerson;
}

//api/group-teacher
export interface IGroupTeacher extends IEntity {
  kindergartenGroup: {
    id: number;
    groupName: string;
  };
  teacher: IPerson;
}

export interface GroupDTO extends IEntity {
  groupName: string;
}

export interface GroupsDTO extends IEntity {
  kindergartenGroup: GroupDTO;
}

//api/teacher
export interface ITeacher extends IPerson {
  email: string;
  password: string;
  isAdmin: boolean;
  groups: GroupsDTO[];
  privateMessages: privateMessageDTO[];
  additionalActivities: additionalActivitiesDTO[];
}

export interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export interface APIResetPassword {
  newPassword: string;
}

export interface IParent extends IPerson {
  email: string;
  password: string;
  identityDocumentNumber: string;
  phoneNumber: string;
  bankAccountNumber?: string;
  address: IAddress;
  children: ChildrenDTO[];
}

export interface APIParentPOST {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  identityDocumentNumber: string;
  bankAccountNumber?: string;
  phoneNumber: string;
  address: IAddress;
}
export interface APIParentPUT {
  name: string;
  surname: string;
  email: string;
  identityDocumentNumber: string;
  bankAccountNumber?: string;
  phoneNumber: string;
  address: IAddress;
}

export interface IAddress {
  city: string;
  street?: string;
  buildingNumber: string;
  flatNumber?: string;
  zipCode: string;
  isWorkAddress: boolean;
}

export interface APITeacherPOST {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isAdmin: boolean;
}
export interface APITeacherPUT {
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
}

export interface AnnouncementDTO {
  subject: string;
  announcement: string;
  // kindergartenGroup: GroupDTO;
}

export interface Announcement {
  groupId: number;
  subject: string;
  announcementText: string;
}
