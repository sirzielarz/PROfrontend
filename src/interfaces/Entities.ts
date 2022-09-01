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

export interface PrivateMessageDTO extends IEntity {
  teacher: IPerson;
  parent: IPerson;
  subject: string;
  messageText: string;
  sender: string;
}

enum MessageSender {
  teacher = "teacher",
  parent = "parent",
}

export interface PrivateMessageAPI {
  teacherId: Number;
  parentId: Number;
  subject: string;
  messageText: string;
  sender: MessageSender;
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

export interface IActivityDTO extends IEntity {
  activityName: string;
  teachers: TeachersDTO[];
}
//api/additional-activity-entry
export interface IActivityEntry extends IEntity {
  additionalActivity: {
    id: number;
    activityName: string;
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

//api/presence
export interface IPresence extends IEntity {
  kindergartenGroup: IKindergartenGroupDTO;
  child: IPerson;
  date: Date;
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
  teachers?: TeachersDTO[];
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
  privateMessages: PrivateMessageDTO[];
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

export interface APIChild {
  name: string;
  surname: string;
  pesel: string;
  birthDate?: string;
  address: IAddressChild;
}

export interface IChild extends IPerson {
  pesel: string;
  birthDate: string;
  address: IAddressChild;
  parents: IPerson[];
  groups: GroupsDTO[];
  additionalActivities: IActivityDTO[];
}

export interface AuthorizationToPickUpDTO extends IEntity {
  authorizedPerson: IAuthorizedPersonDTO;
  authorizationDateFrom: Date;
  authorizationDateTo: Date;
}

export interface IAuthorizedPersonDTO extends IPerson {
  relationship: string;
}

// /api/authorized-person
export interface AuthorizationChildToPickUpDTO extends IEntity {
  child: IPerson;
  authorizationDateFrom: Date;
  authorizationDateTo: Date;
}
export interface IAuthorizedPerson extends IPerson {
  relationship: string;
  identityDocumentNumber: string;
  phoneNumber: string;
  authorizationsToPickUp: AuthorizationChildToPickUpDTO[];
}

export interface APIAuthorizedPerson {
  name: string;
  surname: string;
  relationship: string;
  identityDocumentNumber: string;
  phoneNumber: string;
}

// authorization-to-pickup
export interface IAuthorizationToPickup extends IEntity {
  authorizedPerson: AuthorizedPersonDTO;
  child: IPerson;
  authorizationDateFrom: Date;
  authorizationDateTo: Date;
}

export interface AuthorizedPersonDTO extends IPerson {
  relationship: string;
}

export interface APIAuthorizationToPickup {
  authorizedPersonId: number;
  childId: number;
  authorizationDateFrom: Date;
  authorizationDateTo: Date;
}

export interface IAddress {
  city: string;
  street?: string;
  buildingNumber: string;
  flatNumber?: string;
  zipCode: string;
  isWorkAddress: boolean;
}
export interface IAddressChild {
  city: string;
  street?: string;
  buildingNumber: string;
  flatNumber?: string;
  zipCode: string;
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

export interface IKindergartenGroupDTO extends IEntity {
  groupName: string;
}

export interface IAnnouncement extends IEntity {
  kindergartenGroup: IKindergartenGroupDTO;
  subject: string;
  announcementText: string;
}

export interface APIAnnouncement {
  groupId: number;
  subject: string;
  announcementText: string;
}

export interface APIAnnouncementEdit {
  groupId: string;
  subject: string;
  announcementText: string;
}

export interface APIPhotoAlbumEdit {
  groupId: string;
  albumName: string;
}

export interface PhotoDTO extends IEntity {
  fileName: string;
}

// api/photo-album
export interface IPhotoAlbum extends IEntity {
  albumName: string;
  group: IKindergartenGroupDTO;
  photos: PhotoDTO[];
}
export interface APIPhotoAlbum {
  albumName: string;
  groupId: number;
}

export interface PhotoAlbumDTO extends IEntity {
  albumName: string;
}
// api/photo
export interface IPhoto extends IEntity {
  fileName: string;
  album: PhotoAlbumDTO;
  url: string;
}

export interface APIPhoto {
  file: string;
}
