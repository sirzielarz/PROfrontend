import useSWR from "swr";
import { fetcher } from "../../../api/fetch";
import { Alert, Button, Chip, Grid, Loader, Stack } from "@mantine/core";
import { IGroup, IPresence, ParentMyData } from "../../../interfaces/Entities";
import { useEffect, useState } from "react";
import { getPrettyDate, formatDateToPattern } from "./../../../helpers/utils";

import { sortChildren } from "../../../helpers/utils";
import { Title, Text, Space } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconAlertCircle, IconPencil } from "@tabler/icons";
// import EditPresenceModal from "./EditPresenceModal";
import useAuth from "../../../api/useAuth";

const PresencePage = () => {
  const { isParent } = useAuth();
  const [groupIDSelected, setGroupIDSelected] = useState<string>();
  const [groupNameSelected, setGroupNameSelected] = useState<string>();
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());
  const [dataPresenceFiltered, setDataPresenceFiltered] =
    useState<IPresence[]>();
  const [editingPresence, setEditingPresence] = useState(false);

  /////////////////////
  //parents start
  const { data: parentMyData, error: errorT } = useSWR<ParentMyData, string>(
    isParent ? `${process.env.REACT_APP_URL}/api/parent/my-data` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  //const pmdGroups = parentMyData?.children.map(c=>c.child.)

  // parents end
  ////////////////////

  //get groups
  const { data: dataGroups, error: errorGroups } = useSWR<IGroup[], string>(
    isParent ? null : `${process.env.REACT_APP_URL}/api/group`,
    fetcher,
    {
      revalidateOnFocus: false,
      // revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  //get presence
  const {
    data: dataPresence,
    error: errorPresence,
    mutate: mutatePresence,
  } = useSWR<IPresence[], string>(
    isParent ? null : `${process.env.REACT_APP_URL}/api/presence`,
    fetcher
  );

  //save data
  useEffect(() => {
    const groupName =
      dataGroups && groupIDSelected
        ? dataGroups.find((x) => x.id === Number(groupIDSelected))?.groupName
        : null;

    if (dataPresence && dateSelected) {
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

  return (
    <>
      <Title>Presence</Title>
      <Space h={"xl"} />
      <Grid>
        <Grid.Col xs={12} sm={12} md={4}>
          <Title order={3}>Date:</Title>
          <Calendar value={dateSelected} onChange={setDateSelected} />
        </Grid.Col>

        <Grid.Col sm={3} md={4}>
          <Title order={3}>Presence:</Title>
          <Space h="xs" />

          {dateSelected ? (
            !dataPresence && !errorPresence ? (
              <Loader />
            ) : errorPresence ? (
              errorPresence
            ) : (
              <>
                {/* ///////// */}
                <Text>
                  Presence on <b>{getPrettyDate(dateSelected)}</b>
                </Text>
                <Space h="xl" />
                <Chip.Group>
                  <Stack>
                    {dataGroups && groupIDSelected
                      ? dataGroups
                          .find((x) => x.id === Number(groupIDSelected))
                          ?.children.sort(sortChildren)
                          .map((c, i) => {
                            return (
                              <Chip
                                readOnly={true}
                                key={i + "child_" + c.child.id}
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
              </>
            )
          ) : (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Waiting for data..."
              color="teal"
              radius="md"
              variant="outline"
            >
              Please select group and date to display presence data
            </Alert>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};
export default PresencePage;
