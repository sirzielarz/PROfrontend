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
export interface additionalActivitityDTO extends IEntity {}
// api/additional-activity

export interface IActivity extends IEntity {
  activityName: string;
  teachers: TeachersDTO[];
  children: ChildrenDTO[];
}

// api/group
export interface IGroup {
  id: number;
  groupName: string;
  teachers: TeachersDTO[];
  children: ChildrenDTO[];
  announcements?: AnnouncementDTO[];
}

export interface GroupDTO extends IEntity {
  groupName: string;
}

export interface GroupsDTO extends IEntity {
  kinderGartenGroup: GroupDTO;
}

//api/teacher
export interface ITeacher extends IPerson {
  email: string;
  password: string;
  isAdmin: boolean;
  groups: GroupsDTO[];
  privateMessages: privateMessageDTO[];
  additionalActivities: additionalActivitityDTO[];
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
