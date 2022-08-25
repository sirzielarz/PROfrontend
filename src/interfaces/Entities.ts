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
    groupName: string;
  };
  teacher: IPerson;
}

// api/group
export interface IGroup {
  id: number;
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
