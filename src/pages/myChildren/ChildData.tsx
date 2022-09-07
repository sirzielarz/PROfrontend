import { Grid, Title, Text, Space, Table } from "@mantine/core";

import { KeyedMutator } from "swr";
import { ChildMyDataDTO, ParentMyData } from "../../interfaces/Entities";
import { getPrettyDate, formatDateToPattern } from "./../../helpers/utils";
import {
  IconPhoto,
  IconPrinter,
  IconCameraSelfie,
  IconList,
  IconListCheck,
  IconUserCheck,
} from "@tabler/icons";
import { Accordion } from "@mantine/core";
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
                    <Accordion.Panel>
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
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="authorizationToPickup">
                    <Accordion.Control icon={<IconUserCheck size={20} />}>
                      Authorization to pickup
                    </Accordion.Control>
                    <Accordion.Panel>
                      {!(child.authorizationsToPickUp.length > 0) ? (
                        <Text>No authorizations to pickup</Text>
                      ) : (
                        <>
                          <Grid>
                            <Grid.Col span={12}>
                              <Table>
                                <thead>
                                  <th style={{ textAlign: "left" }}>name</th>
                                  <th style={{ textAlign: "left" }}>surname</th>
                                  <th style={{ textAlign: "left" }}>
                                    reliationship
                                  </th>
                                  <th style={{ textAlign: "left" }}>
                                    date from
                                  </th>
                                  <th style={{ textAlign: "left" }}>date to</th>
                                </thead>
                                <tbody>
                                  {child.authorizationsToPickUp.map((a) => {
                                    return (
                                      <tr>
                                        <td>{a.authorizedPerson.name}</td>
                                        <td>{a.authorizedPerson.surname}</td>
                                        <td>
                                          {a.authorizedPerson.relationship}
                                        </td>
                                        <td>
                                          {formatDateToPattern(
                                            a.authorizationDateFrom
                                          )}
                                        </td>
                                        <td>
                                          {formatDateToPattern(
                                            a.authorizationDateTo
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </Grid.Col>
                          </Grid>
                        </>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>

                  {/* //////////////////// */}
                  {/* <Accordion.Item value="Groups">
                    <Accordion.Control icon={<IconUserCheck size={20} />}>
                      Groups
                    </Accordion.Control>
                    <Accordion.Panel>
                      {!(child.groups.length > 0) ? (
                        <Text>No groups</Text>
                      ) : (
                        <>
                          <Grid>
                            <Grid.Col span={12}>
                              <Table>
                                <thead>
                                  <th style={{ textAlign: "left" }}>id</th>
                                  <th style={{ textAlign: "left" }}>name</th>
                                  <th style={{ textAlign: "left" }}>
                                    teachers
                                  </th>
                                  <th style={{ textAlign: "left" }}>
                                    date from
                                  </th>
                                  <th style={{ textAlign: "left" }}>date to</th>
                                </thead>
                                <tbody>
                                  {child.groups.map((a) => {
                                    return (
                                      <tr>
                                        <td>{a.kindergartenGroup.id}</td>
                                        <td>{a.kindergartenGroup.groupName}</td>
                                        <td>
                                          <>
                                            {a.kindergartenGroup.teachers.map(
                                              () => ({})
                                            )}
                                          </>
                                        </td>
                                        <td>{a.kindergartenGroup.id}</td>
                                        <td>{a.kindergartenGroup.id}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                            </Grid.Col>
                          </Grid>
                        </>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item> */}

                  <Accordion.Item value="camera">
                    <Accordion.Control icon={<IconCameraSelfie size={20} />}>
                      Photos
                    </Accordion.Control>
                    <Accordion.Panel>No photos</Accordion.Panel>
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
};
