import { Grid, Text, Space, Table, Image, Container } from "@mantine/core";

import { KeyedMutator } from "swr";
import {
  APIAnnouncementMyDataDTO,
  ChildMyDataDTO,
  ParentMyData,
  PhotoAlbumMyDataDTO,
  PhotoDTO,
  TeachersDTO,
} from "../../interfaces/Entities";
import { formatDateToPattern } from "./../../helpers/utils";
import {
  IconListCheck,
  IconMessage,
  IconPictureInPicture,
  IconSportBillard,
  IconUserCheck,
} from "@tabler/icons";
import { Accordion } from "@mantine/core";
import { ReactNode } from "react";
import { Calendar } from "@mantine/dates";
interface ChildDataProps {
  mutate: KeyedMutator<ParentMyData>;
  childSelected: string;
  setChildSelected: (arg: string) => void;
  childrenData: ChildMyDataDTO[];
}
export const ChildData: React.FC<ChildDataProps> = ({
  mutate,
  childSelected,
  setChildSelected,
  childrenData,
}) => {
  //const [value, setValue] = useState<Date[]>([]);

  if (childSelected) {
    let child = childrenData.find((x) => x.id === Number(childSelected));

    console.log(child);

    if (child) {
      return (
        <>
          <Grid>
            <Grid.Col span={12}>
              <>
                <Space h={"xs"} />
                <Accordion variant="contained">
                  <Accordion.Item value="basicData">
                    <Accordion.Control icon={<IconListCheck size={20} />}>
                      Basic data
                    </Accordion.Control>
                    <Accordion.Panel>{getBasicData()}</Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="authorizationToPickup">
                    <Accordion.Control icon={<IconUserCheck size={20} />}>
                      Authorization to pickup
                    </Accordion.Control>
                    <Accordion.Panel>{getATP()}</Accordion.Panel>
                  </Accordion.Item>

                  {/* //////////////////// */}
                  <Accordion.Item value="Groups">
                    <Accordion.Control icon={<IconListCheck size={20} />}>
                      Groups
                    </Accordion.Control>
                    <Accordion.Panel>{getGroups()}</Accordion.Panel>
                  </Accordion.Item>
                  {/* //////////////////// */}

                  <Accordion.Item value="Announcements">
                    <Accordion.Control icon={<IconMessage size={20} />}>
                      Announcements
                    </Accordion.Control>
                    <Accordion.Panel> {getAnnouncements()}</Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="Additional activities">
                    <Accordion.Control icon={<IconSportBillard size={20} />}>
                      Additional activities
                    </Accordion.Control>
                    <Accordion.Panel>{getAA()}</Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="Presence">
                    <Accordion.Control
                      icon={<IconPictureInPicture size={20} />}
                    >
                      Presence
                    </Accordion.Control>
                    <Accordion.Panel>{getPresence()}</Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="Photo albums">
                    <Accordion.Control
                      icon={<IconPictureInPicture size={20} />}
                    >
                      Photo albums
                    </Accordion.Control>
                    <Accordion.Panel>{getPhotoAlbums()}</Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </>
            </Grid.Col>
          </Grid>
        </>
      );
    } else {
      return <></>;
    }
  } else {
    setChildSelected("");
    return <></>;
  }

  function getTeachersList(teachers: TeachersDTO[]) {
    let out: ReactNode = <></>;
    if (!(teachers.length > 0)) {
      return <>No teachers found</>;
    } else {
      out = teachers.map((t) => {
        return (
          <>
            <Text>
              {t.teacher.name} {t.teacher.surname}
            </Text>
          </>
        );
      });
    }
    return <>{out}</>;
  }

  function getGroups(): ReactNode {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            {!(child.groups.length > 0) ? (
              <Text>No groups</Text>
            ) : (
              <>
                <Grid>
                  <Grid.Col span={12}>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left" }}>id</th>
                          <th style={{ textAlign: "left" }}>name</th>
                          <th style={{ textAlign: "left" }}>teachers</th>
                        </tr>
                      </thead>
                      <tbody>
                        {child.groups.map((a) => {
                          return (
                            <tr>
                              <td>{a.kindergartenGroup.id}</td>
                              <td>{a.kindergartenGroup.groupName}</td>
                              <td>
                                <>
                                  {getTeachersList(
                                    a.kindergartenGroup.teachers
                                  )}
                                </>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Grid.Col>
                </Grid>
                {}
              </>
            )}
          </>
        );
      }
    }
  }

  function getBasicData(): ReactNode {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            <Grid>
              <Grid.Col span={6}>
                <Table>
                  <tbody>
                    <tr>
                      <td>name</td>
                      <td>{child.name}</td>
                    </tr>
                    <tr>
                      <td>surname</td>
                      <td>{child.surname}</td>
                    </tr>
                    <tr>
                      <td>pesel</td>
                      <td>{child.pesel}</td>
                    </tr>
                    <tr>
                      <td>birth date</td>
                      <td>{child.birthDate}</td>
                    </tr>
                  </tbody>
                </Table>
              </Grid.Col>
              <Grid.Col span={6}>
                <Table>
                  <tbody>
                    <tr>
                      <td>city</td>
                      <td>{child.address.city}</td>
                    </tr>
                    <tr>
                      <td>street</td>
                      <td>{child.address.street}</td>
                    </tr>
                    <tr>
                      <td>building number</td>
                      <td>{child.address.buildingNumber}</td>
                    </tr>
                    <tr>
                      <td>flat number</td>
                      <td>{child.address.flatNumber}</td>
                    </tr>
                    <tr>
                      <td>zip code</td>
                      <td>{child.address.zipCode}</td>
                    </tr>
                  </tbody>
                </Table>
              </Grid.Col>
              <Grid.Col span={12}></Grid.Col>
            </Grid>
          </>
        );
      }
    }
  }

  function getPresence(): ReactNode {
    let dates: Date[] = [];

    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            {!(child.presences.length > 0) ? (
              <Text>No presence data yet</Text>
            ) : (
              <>
                <Container>
                  <>
                    {/* <Calendar multiple value={dates} /> */}
                    {child.presences.forEach((a, i) => {
                      const dateToAdd = new Date(a.date);
                      dates.push(dateToAdd);
                    })}
                    <Calendar
                      value={dates}
                      multiple={true}
                      fullWidth
                      size="xl"
                      styles={(theme) => ({
                        cell: {
                          border: `1px solid ${
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[4]
                              : theme.colors.gray[2]
                          }`,
                        },
                        day: {
                          borderRadius: 0,
                          height: 70,
                          fontSize: theme.fontSizes.lg,
                        },
                        weekday: { fontSize: theme.fontSizes.lg },
                        weekdayCell: {
                          fontSize: theme.fontSizes.xl,
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[5]
                              : theme.colors.gray[0],
                          border: `1px solid ${
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[4]
                              : theme.colors.gray[2]
                          }`,
                          height: 70,
                        },
                      })}
                    />
                  </>
                </Container>
              </>
            )}
          </>
        );
      }
    }
  }

  function getAA(): ReactNode {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            {!(child.additionalActivities.length > 0) ? (
              <Text>No additional activities</Text>
            ) : (
              <>
                <Grid>
                  <Grid.Col span={12}>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left" }}>id</th>
                          <th style={{ textAlign: "left" }}>name</th>
                          <th style={{ textAlign: "left" }}>teachers</th>
                        </tr>
                      </thead>
                      <tbody>
                        {child.additionalActivities.map((a) => {
                          return (
                            <tr>
                              <td>{a.additionalActivity.id}</td>
                              <td>{a.additionalActivity.activityName}</td>
                              <td>
                                <>
                                  {getTeachersList(
                                    a.additionalActivity.teachers
                                  )}
                                </>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Grid.Col>
                </Grid>
                {}
              </>
            )}
          </>
        );
      }
    }
  }

  function getATP(): ReactNode {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return !(child.authorizationsToPickUp.length > 0) ? (
          <Text>No authorizations to pickup</Text>
        ) : (
          <>
            <Grid>
              <Grid.Col span={12}>
                <Table>
                  <thead>
                    <th style={{ textAlign: "left" }}>name</th>
                    <th style={{ textAlign: "left" }}>surname</th>
                    <th style={{ textAlign: "left" }}>reliationship</th>
                    <th style={{ textAlign: "left" }}>date from</th>
                    <th style={{ textAlign: "left" }}>date to</th>
                  </thead>
                  <tbody>
                    {child.authorizationsToPickUp.map((a) => {
                      return (
                        <tr>
                          <td>{a.authorizedPerson.name}</td>
                          <td>{a.authorizedPerson.surname}</td>
                          <td>{a.authorizedPerson.relationship}</td>
                          <td>
                            {formatDateToPattern(a.authorizationDateFrom)}
                          </td>
                          <td>{formatDateToPattern(a.authorizationDateTo)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Grid.Col>
            </Grid>
          </>
        );
      }
    }
  }

  function getAnnouncements() {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        //const announcements: APIAnnouncementMyDataDTO = [];
        return (
          <>
            {child.groups.map((g, i) => (
              <>
                <Text>
                  Announcements for group:{" "}
                  {child?.groups[i].kindergartenGroup.groupName}
                </Text>
                {getAnnouncement(g.kindergartenGroup.announcements)}
              </>
            ))}
          </>
        );
      }
    }
  }

  function getAnnouncement(
    anouncements: APIAnnouncementMyDataDTO[]
  ): ReactNode {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            {!(anouncements.length > 0) ? (
              <Text>No announcements for group</Text>
            ) : (
              <>
                <Grid>
                  <Grid.Col span={12}>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left" }}>id</th>
                          <th style={{ textAlign: "left" }}>subject</th>
                          <th style={{ textAlign: "left" }}>announcement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {anouncements.map((a) => {
                          return (
                            <tr>
                              <td>{a.id}</td>
                              <td>{a.subject}</td>
                              <td>{a.announcementText}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Grid.Col>
                </Grid>
                {}
              </>
            )}
          </>
        );
      }
    }
  }

  function getPhotoAlbums() {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            {child.groups.map((g, i) => (
              <>
                <Text>
                  Photoalbums for group:{" "}
                  {child?.groups[i].kindergartenGroup.groupName}
                </Text>
                {getAlbum(g.kindergartenGroup.albums)}
              </>
            ))}
          </>
        );
      }
    }
  }

  function getAlbum(album: PhotoAlbumMyDataDTO[]) {
    if (childSelected) {
      let child = childrenData.find((x) => x.id === Number(childSelected));
      if (child) {
        return (
          <>
            {!(album.length > 0) ? (
              <Text>No photos for album</Text>
            ) : (
              <>
                <Grid>
                  <Grid.Col span={12}>
                    {album.map((a) => {
                      return (
                        <>
                          <Text>Album: {a.albumName}</Text>
                          {getPhotos(a.photos)}
                        </>
                      );
                    })}
                  </Grid.Col>
                </Grid>
                {}
              </>
            )}
          </>
        );
      }
    }
  }

  function getPhotos(photos: PhotoDTO[]): ReactNode {
    return (
      <>
        {!(photos.length > 0) ? (
          <Text>No photos for album</Text>
        ) : (
          <>
            <Grid>
              {photos.map((photo) => {
                return (
                  <>
                    <Grid.Col span={4}>
                      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <Image
                          radius="md"
                          src={photo.url}
                          alt={photo.fileName}
                        />
                      </div>
                    </Grid.Col>
                  </>
                );
              })}
            </Grid>
            {}
          </>
        )}
      </>
    );
  }
  ////
};
