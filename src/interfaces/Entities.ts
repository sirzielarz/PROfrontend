export interface TeachersDTO {
  teacher: TeacherDTO;
}

export interface TeacherDTO {
  id: number;
  name: string;
  surname: string;
}

export interface ChildDTO {
  id: number;
  name: string;
  surname: string;
}

export interface ChildrenDTO {
  child: ChildDTO;
  teachers: TeacherDTO;
}

export interface ChildDTO {
  id: number;
  name: string;
  surname: string;
}

// api/group
export interface GroupDTO {
  id: number;
  groupName: string;
  teachers: TeachersDTO[];
  children: ChildrenDTO[];
  announcements?: AnnouncementDTO[];
}

export interface AnnouncementDTO {
  subject: string;
  announcement: string;
  // kindergartenGroup: KindergartenGroup;
}

export interface Announcement {
  groupId: number;
  subject: string;
  announcementText: string;
}
