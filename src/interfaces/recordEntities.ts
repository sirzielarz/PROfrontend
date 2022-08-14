export interface Record {
  id?: number;
}

// /api/teacher/{id}
// /api/teacher/myData
export interface Teacher extends Record {
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  groups?: Group[];
  privateMessages?: PrivateMessage[];
  additionalActivities?: AdditionalActivity[];
}

// /api/presence/{id}
// /api/presence/
export interface Presence extends Record {
  kindergartenGroup: Group;
  child: Child;
  date: Date;
}

// /api/photo-album/{id}
// /api/photo-album
export interface PhotoAlbum extends Record {
  albumName: string;
  group: Group;
  photos?: Photo[];
}

export interface Photo extends Record {
  filename: string;
}

export interface PrivateMessage extends Record {
  teacher: Teacher;
  parent: Parent;
  subject: string;
  messageText: string;
  sender: string;
  receiver: string;
}

export interface Group extends Record {
  groupName: string;
  children: Child[];
  teachers: Teacher[];
}

// /api/parent/{id}
// /api/parent/
// /api/parent/myData @todo
export interface Parent extends Record {
  name: string;
  surname: string;
  email: string;
  password: string;
  identityDocumentNumber: string;
  phoneNumber: string;
  bankAccountNumber?: string | null;
  address: Address;
  children: Child[];
  privateMessages: null;
}

export interface Address {
  city: string;
  street?: string;
  buildingNumber: string;
  flatNumber?: string;
  zipCode: string;
  isWorkAddress: boolean;
}

export interface Annoucment extends Record {
  subject: string;
  announcementText: string;
  //kindergartenGroup
}

export interface KindergartenGroup extends Record {
  groupName: string;
  teachers: Teacher[];
  children: Child[];
  announcements: Annoucment[];
}
export interface Child extends Record {
  name: string;
  surname: string;
  pesel: string;
  birthDate: Date;
  address: Address;
  authorizationsToPickUp?: AuthorizedPerson[];
  parents: Parent[];
  groups?: Group[];
  additionalActivities?: AdditionalActivity[];
}

export interface AdditionalActivity extends Record {
  activityName: string;
  teachers: Teacher[];
}

export interface AuthorizedPerson extends Record {
  name: string;
  surname: string;
  relationship: string;
  identityDocumentNumber: string;
  phoneNumber: string;
  authorizationsToPickUp?: AuthorizationsToPickUp[];
}

export interface AuthorizationsToPickUp extends Record {
  child: Child;
  authorizationDateFrom: Date;
  authorizationDateTo: Date;
}

// /api/additional-activity-teacher/{id}
export interface AdditionalActivityTeacher extends Record {
  additionalActivity: AdditionalActivity;
  teacher: Teacher;
}

// /api/additional-activity-entry/{id}
export interface AdditionalActivityEntry extends Record {
  additionalActivity: AdditionalActivity;
  child: Child;
}
