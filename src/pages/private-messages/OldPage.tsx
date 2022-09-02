import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Alert, Button, Chip, Grid, Loader, Stack } from "@mantine/core";
import { IGroup, IPresence } from "../../interfaces/Entities";
import { useEffect, useState } from "react";
import { getPrettyDate, formatDateToPattern } from "../../helpers/utils";
import { sortChildren } from "../../helpers/utils";
import { Title, Text, Space } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconAlertCircle, IconPencil } from "@tabler/icons";
import EditPresenceModal from "./EditPresenceModal";
import useAuth from "../../api/useAuth";

const Page = () => {
  const { isAdmin, isParent } = useAuth();

  const [groupIDSelected, setGroupIDSelected] = useState<string>();
  const [groupNameSelected, setGroupNameSelected] = useState<string>();
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());
  const [dataPresenceFiltered, setDataPresenceFiltered] =
    useState<IPresence[]>();
  const [editingPresence, setEditingPresence] = useState(false);

  // conditionally fetch
  const { data: myData, error } = useSWR(
    isParent ? "/api/parent/my-data" : "/api/teacher/my-data",
    fetcher
  );

  const { data: dataGroups, error: errorGroups } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );

  //get presence
  const {
    data: dataPresence,
    error: errorPresence,
    mutate: mutatePresence,
  } = useSWR<IPresence[], string>(
    `${process.env.REACT_APP_URL}/api/presence`,
    fetcher
  );

  //save data
  useEffect(() => {
    const groupName =
      dataGroups && groupIDSelected
        ? dataGroups.find((x) => x.id === Number(groupIDSelected))?.groupName
        : null;

    if (groupName) {
      setGroupNameSelected(groupName);
    }
    if (dataPresence && dateSelected && groupIDSelected) {
      if (dataPresence.length > 0) {
        const dataFiltered = dataPresence.filter((x) => {
          return (
            x.kindergartenGroup.id === Number(groupIDSelected) &&
            formatDateToPattern(x.date) === formatDateToPattern(dateSelected)
          );
        });
        setDataPresenceFiltered(dataFiltered);
      }
    } else {
      setDataPresenceFiltered([]);
    }
  }, [groupIDSelected, dateSelected, dataGroups, dataPresence]);

  //generate groups chips
  const GroupsChips = ({ data }: { data: IGroup[] }) => {
    const chipsItems = data.map((item) => {
      return (
        <>
          <Chip key={"group_" + item.id} value={String(item.id)}>
            {item.groupName}
          </Chip>
        </>
      );
    });
    return (
      <Chip.Group
        multiple={false}
        value={groupIDSelected}
        onChange={setGroupIDSelected}
      >
        {chipsItems}
      </Chip.Group>
    );
  };

  return (
    <Grid>
      <Grid.Col sm={3} md={3}>
        <Title order={3}>Groups:</Title>
        <Space h="xl" />
        {errorGroups ? errorGroups : ""}
        {dataGroups ? (
          dataGroups.length > 0 ? (
            <>
              <GroupsChips data={dataGroups} /> <Space h="xl" />
              {/* <Text>Groups fetched data: {}</Text>
              <div className="jsonout">
                {JSON.stringify(dataGroups, null, 4)}
              </div> */}
            </>
          ) : (
            <Text>No recent conversations.</Text>
          )
        ) : (
          <Loader />
        )}
      </Grid.Col>
      <Grid.Col xs={12} sm={12} md={4}>
        <Title order={3}>Date:</Title>
        <Text>Welcome </Text>
        <Calendar value={dateSelected} onChange={setDateSelected} />
        {/* <Space h="xl" />
        <Text size={"lg"} weight={"bold"}>
          Presence all fetched data: {}
        </Text>
        <div className="jsonout">{JSON.stringify(dataPresence, null, 4)}</div> */}
      </Grid.Col>
      <Grid.Col sm={3} md={4}>
        <Title order={3}>Messages:</Title>
        <Space h="xs" />

        {groupIDSelected && dateSelected ? (
          !dataPresence && !errorPresence ? (
            <Loader />
          ) : errorPresence ? (
            errorPresence
          ) : (
            <>
              {/* ///////// */}
              <Text>
                Conversation with on <b>{getPrettyDate(dateSelected)}</b> for
                group <b>{groupNameSelected}</b>
              </Text>
              <Space h="xl" />
              <Chip.Group>
                <Stack>
                  {dataGroups && groupIDSelected
                    ? dataGroups
                        .find((x) => x.id === Number(groupIDSelected))
                        ?.children.sort(sortChildren)
                        .map((c) => {
                          return (
                            <Chip
                              readOnly={true}
                              key={"child_" + c.child.id}
                              value={String(c.child.id)}
                              disabled={
                                !dataPresenceFiltered?.some(
                                  (x) => x.child.id === c.child.id
                                )
                              }
                              checked={dataPresenceFiltered?.some(
                                (x) => x.child.id === c.child.id
                              )}
                            >
                              {c.child.surname + " " + c.child.name}
                            </Chip>
                          );
                        })
                    : null}
                </Stack>
              </Chip.Group>
              <Space h="xl" />

              {dataGroups && dataGroups.length > 0 && groupIDSelected && (
                <Button
                  leftIcon={<IconPencil size={16} stroke={1.5} />}
                  onClick={() => setEditingPresence(true)}
                >
                  Write a message
                </Button>
              )}

              {editingPresence &&
                dataGroups &&
                groupIDSelected &&
                groupNameSelected &&
                dataPresenceFiltered && (
                  <EditPresenceModal
                    groupIDSelected={groupIDSelected}
                    groupNameSelected={groupNameSelected}
                    dateSelected={dateSelected}
                    dataPresenceFiltered={dataPresenceFiltered}
                    mutate={mutatePresence}
                    handleClose={() => setEditingPresence(false)}
                  />
                )}

              <Space h="xl" />
              <Text size={"lg"} weight={"bold"}>
                Filtered fetched data: {}
              </Text>
              <div className="jsonout">
                {JSON.stringify(dataPresenceFiltered, null, 4)}
              </div>

              {/* // eswssssssssssssssssssssssssss */}
            </>
          )
        ) : (
          <>
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Waiting for data..."
              color="teal"
              radius="md"
              variant="outline"
            >
              Please select person to display conversation
            </Alert>
            <Text>APIfetched data:</Text>
            <div className="jsonout">
              {JSON.stringify(myData, null, 4)}
            </div>{" "}
          </>
        )}
      </Grid.Col>
    </Grid>
  );
};
export default Page;