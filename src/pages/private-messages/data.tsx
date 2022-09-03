export const data = {
  id: 7,
  name: "Lilianna",
  surname: "Głowacka",
  email: "lglowacka@test.com",
  password: "$2a$10$qVY2mU7w3nZey1uEkf3he.ZpCCLh1osEf80kIkUsC7aAhrQdtyZTa",
  identityDocumentNumber: "AMJ963469",
  phoneNumber: "8774100661",
  bankAccountNumber: "PL61219031205463263055582929",
  address: {
    city: "Opole",
    street: "Gajdy",
    buildingNumber: "1",
    flatNumber: "1",
    zipCode: "67-903",
    isWorkAddress: false,
  },
  children: [
    {
      child: {
        id: 10,
        name: "Jan",
        surname: "Kowalski",
        pesel: "15251994213",
        birthDate: "2015-05-19",
        address: {
          city: "Opole",
          street: "Gajdy",
          buildingNumber: "1",
          flatNumber: "1",
          zipCode: "67-903",
          isWorkAddress: false,
        },
        authorizationsToPickUp: [
          {
            id: 2,
            authorizedPerson: {
              id: 8,
              name: "Alfons",
              surname: "Milewski",
              relationship: "Wujek",
            },
            authorizationDateFrom: "2022-08-31",
            authorizationDateTo: "2022-09-09",
          },
          {
            id: 3,
            authorizedPerson: {
              id: 12,
              name: "afdsfadsafds",
              surname: "adfafafdafds",
              relationship: "fdasafdfadsafdsfadsfadsfads",
            },
            authorizationDateFrom: "2022-09-07",
            authorizationDateTo: "2022-10-01",
          },
        ],
        groups: [
          {
            kindergartenGroup: {
              id: 2,
              groupName: "Grupa 2",
              teachers: [
                {
                  teacher: {
                    id: 9,
                    name: "Anna",
                    surname: "Lewandowska",
                  },
                },
                {
                  teacher: {
                    id: 1,
                    name: "Adam",
                    surname: "Administerski",
                  },
                },
              ],
              albums: [],
              announcements: [
                {
                  id: 3,
                  subject: "dgsdfsd",
                  announcementText: "dfsadfsdfasadsfafds",
                },
              ],
            },
          },
        ],
        additionalActivities: [
          {
            additionalActivity: {
              id: 2,
              activityName: "painting",
              teachers: [
                {
                  teacher: {
                    id: 9,
                    name: "Anna",
                    surname: "Lewandowska",
                  },
                },
                {
                  teacher: {
                    id: 1,
                    name: "Adam",
                    surname: "Administerski",
                  },
                },
              ],
            },
          },
        ],
        presences: [],
      },
    },
    {
      child: {
        id: 3,
        name: "Jarosław",
        surname: "Sosnowski",
        pesel: "05211193497",
        birthDate: "2005-01-11",
        address: {
          city: "Opole",
          street: "Gajdy",
          buildingNumber: "1",
          flatNumber: "1",
          zipCode: "67-903",
          isWorkAddress: false,
        },
        authorizationsToPickUp: [
          {
            id: 1,
            authorizedPerson: {
              id: 8,
              name: "Alfons",
              surname: "Milewski",
              relationship: "Wujek",
            },
            authorizationDateFrom: "2022-07-30",
            authorizationDateTo: "2023-07-30",
          },
        ],
        groups: [
          {
            kindergartenGroup: {
              id: 2,
              groupName: "Grupa 2",
              teachers: [
                {
                  teacher: {
                    id: 9,
                    name: "Anna",
                    surname: "Lewandowska",
                  },
                },
                {
                  teacher: {
                    id: 1,
                    name: "Adam",
                    surname: "Administerski",
                  },
                },
              ],
              albums: [],
              announcements: [
                {
                  id: 3,
                  subject: "dgsdfsd",
                  announcementText: "dfsadfsdfasadsfafds",
                },
              ],
            },
          },
          {
            kindergartenGroup: {
              id: 1,
              groupName: "Grupa1",
              teachers: [
                {
                  teacher: {
                    id: 2,
                    name: "Ryszard",
                    surname: "Bukowski",
                  },
                },
                {
                  teacher: {
                    id: 1,
                    name: "Adam",
                    surname: "Administerski",
                  },
                },
              ],
              albums: [
                {
                  albumName: "test album",
                  photos: [
                    {
                      id: 4,
                      fileName: "zdjecie-tygodnia.jpeg",
                      url: "https://kindergarten-image-storage.s3.eu-central-1.amazonaws.com/zdjecie-tygodnia.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220902T191316Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIATAKJLMJPYVAEILVQ%2F20220902%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=71b37f2386e085670458311338a114163650bb9f433c96396bdba78316c90e4b",
                    },
                    {
                      id: 2,
                      fileName: "zdjecie-tygodnia.jpeg",
                      url: "https://kindergarten-image-storage.s3.eu-central-1.amazonaws.com/zdjecie-tygodnia.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220902T191316Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIATAKJLMJPYVAEILVQ%2F20220902%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=71b37f2386e085670458311338a114163650bb9f433c96396bdba78316c90e4b",
                    },
                    {
                      id: 1,
                      fileName: "zdjecie-tygodnia.jpeg",
                      url: "https://kindergarten-image-storage.s3.eu-central-1.amazonaws.com/zdjecie-tygodnia.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220902T191316Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIATAKJLMJPYVAEILVQ%2F20220902%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=71b37f2386e085670458311338a114163650bb9f433c96396bdba78316c90e4b",
                    },
                    {
                      id: 5,
                      fileName: "zdjecie-tygodnia.jpeg",
                      url: "https://kindergarten-image-storage.s3.eu-central-1.amazonaws.com/zdjecie-tygodnia.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220902T191316Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIATAKJLMJPYVAEILVQ%2F20220902%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=71b37f2386e085670458311338a114163650bb9f433c96396bdba78316c90e4b",
                    },
                    {
                      id: 3,
                      fileName: "zdjecie-tygodnia.jpeg",
                      url: "https://kindergarten-image-storage.s3.eu-central-1.amazonaws.com/zdjecie-tygodnia.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220902T191316Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIATAKJLMJPYVAEILVQ%2F20220902%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=71b37f2386e085670458311338a114163650bb9f433c96396bdba78316c90e4b",
                    },
                  ],
                },
              ],
              announcements: [
                {
                  id: 2,
                  subject: "Inne ogłoszenie",
                  announcementText:
                    "Inne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenieInne ogłoszenie",
                },
                {
                  id: 1,
                  subject: "Bardzo ważne ogłoszenie",
                  announcementText:
                    "treść ogłószenia treść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószeniatreść ogłószenia",
                },
              ],
            },
          },
        ],
        additionalActivities: [
          {
            additionalActivity: {
              id: 2,
              activityName: "painting",
              teachers: [
                {
                  teacher: {
                    id: 9,
                    name: "Anna",
                    surname: "Lewandowska",
                  },
                },
                {
                  teacher: {
                    id: 1,
                    name: "Adam",
                    surname: "Administerski",
                  },
                },
              ],
            },
          },
          {
            additionalActivity: {
              id: 1,
              activityName: "music",
              teachers: [
                {
                  teacher: {
                    id: 2,
                    name: "Ryszard",
                    surname: "Bukowski",
                  },
                },
                {
                  teacher: {
                    id: 1,
                    name: "Adam",
                    surname: "Administerski",
                  },
                },
              ],
            },
          },
        ],
        presences: [
          {
            kindergartenGroup: {
              id: 1,
              groupName: "Grupa1",
            },
            date: "2022-07-30",
          },
        ],
      },
    },
  ],
  privateMessages: [
    {
      id: 3,
      teacher: {
        id: 1,
        name: "Adam",
        surname: "Administerski",
      },
      parent: {
        id: 7,
        name: "Lilianna",
        surname: "Głowacka",
      },
      subject: "sint 2",
      messageText: "laborum ad occaecat proident 2",
      sender: "teacher",
    },
    {
      id: 1,
      teacher: {
        id: 2,
        name: "Ryszard",
        surname: "Bukowski",
      },
      parent: {
        id: 7,
        name: "Lilianna",
        surname: "Głowacka",
      },
      subject: "test",
      messageText: "test message",
      sender: "parent",
    },
    {
      id: 2,
      teacher: {
        id: 1,
        name: "Adam",
        surname: "Administerski",
      },
      parent: {
        id: 7,
        name: "Lilianna",
        surname: "Głowacka",
      },
      subject: "sint dolor",
      messageText: "laborum ad occaecat proident",
      sender: "parent",
    },
    {
      id: 5,
      teacher: {
        id: 1,
        name: "Adam",
        surname: "Administerski",
      },
      parent: {
        id: 7,
        name: "Lilianna",
        surname: "Głowacka",
      },
      subject: "sint 4",
      messageText: "laborum ad occaecat proident 4",
      sender: "parent",
    },
    {
      id: 4,
      teacher: {
        id: 1,
        name: "Adam",
        surname: "Administerski",
      },
      parent: {
        id: 7,
        name: "Lilianna",
        surname: "Głowacka",
      },
      subject: "sint 2",
      messageText: "laborum ad occaecat proident 2",
      sender: "teacher",
    },
  ],
};
