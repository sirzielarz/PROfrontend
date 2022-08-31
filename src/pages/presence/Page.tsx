import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Alert, Chip, Grid, Loader, Stack } from "@mantine/core";
import { IGroup, IPresence } from "../../interfaces/Entities";
import { useEffect, useState } from "react";
import { getPrettyDate, formatDateToPattern } from "./../../helpers/utils";

import { sortTeachers, sortChildren } from "../../helpers/utils";
import { Title, Text, Space, Table, Group, ScrollArea } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";
import { IconAlertCircle } from "@tabler/icons";

const PresencePage = () => {
  const [groupIDSelected, setGroupIDSelected] = useState<string>();
  const [groupNameSelected, setGroupNameSelected] = useState<string>();
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());
  const [dataPresenceFiltered, setDataPresenceFiltered] =
    useState<IPresence[]>();

  useEffect(() => {
    const groupName =
      dataGroups && groupIDSelected
        ? dataGroups.find((x) => x.id === Number(groupIDSelected))?.groupName
        : null;

    if (groupName) {
      setGroupNameSelected(groupName);
    }
    if (dataPresence && dateSelected && groupIDSelected) {
      const dataFiltered = dataPresence.filter((x) => {
        // console.log("checking  -------------------");
        // console.log("checking groups ids");
        // console.log("selected:", Number(groupIDSelected));
        // console.log("from presence array", x.kindergartenGroup.id);
        // console.log(
        //   "test groups: ",
        //   x.kindergartenGroup.id === Number(groupIDSelected)
        // );
        // console.log("checking dates");
        // console.log("selected:", formatDateToPattern(dateSelected));
        // console.log("from presence array", formatDateToPattern(x.date));
        // console.log(
        //   "test dates: ",
        //   formatDateToPattern(x.date) === formatDateToPattern(dateSelected)
        // );
        // console.log(
        //   "FINAL: ",
        //   x.kindergartenGroup.id === Number(groupIDSelected) &&
        //     formatDateToPattern(x.date) === formatDateToPattern(dateSelected)
        // );
        return (
          x.kindergartenGroup.id === Number(groupIDSelected) &&
          formatDateToPattern(x.date) === formatDateToPattern(dateSelected)
        );
      });
      setDataPresenceFiltered(dataFiltered);
    } else {
      setDataPresenceFiltered([]);
    }
  }, [groupIDSelected, dateSelected]);

  //get groups
  const {
    data: dataGroups,
    error: errorGroups,
    mutate: mutateGroups,
  } = useSWR<IGroup[], string>(
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

  const GroupsChips = ({ data }: { data: IGroup[] }) => {
    const chipsItems = data.map((item) => {
      return (
        <>
          <Chip value={String(item.id)}>{item.groupName}</Chip>
        </>
      );
    });
    return (
      <Chip.Group
        multiple={false}
        value={groupIDSelected}
        onChange={setGroupIDSelected}
      >
        <Stack>{chipsItems}</Stack>
      </Chip.Group>
    );
  };

  return (
    <Grid>
      <Grid.Col span={4}>
        <Title order={3}>Groups:</Title>
        <Space h="xl" />
        {errorGroups ? errorGroups : ""}
        {dataGroups ? (
          dataGroups.length > 0 ? (
            <>
              <GroupsChips data={dataGroups} /> <Space h="xl" />
              <Text>Groups fetched data: {}</Text>
              <div className="jsonout">
                {JSON.stringify(dataGroups, null, 4)}
              </div>
            </>
          ) : (
            <Text>No groups exist.</Text>
          )
        ) : (
          <Loader />
        )}
        <Space h="lg" />
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={3}>Date:</Title>
        <Calendar value={dateSelected} onChange={setDateSelected} />
        <Space h="xl" />
        <Text size={"lg"} weight={"bold"}>
          Presence all fetched data: {}
        </Text>
        <div className="jsonout">{JSON.stringify(dataPresence, null, 4)}</div>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={3}>Presence:</Title>
        <Space h="xl" />

        {groupIDSelected && dateSelected ? (
          !dataPresence && !errorPresence ? (
            <Loader />
          ) : errorPresence ? (
            errorPresence
          ) : (
            <>
              {/* // eeeeeeeeeeeeeeeeeeeeeeeee */}
              <Text>
                Presence on: <b>{getPrettyDate(dateSelected)}</b> for group:{" "}
                <b>{groupNameSelected}</b>
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
                              readOnly
                              key={"child_" + c.child.id}
                              value={String(c.child.id)}
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
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Waiting for data..."
            color="teal"
            radius="md"
            variant="outline"
          >
            Please select group and date
          </Alert>
        )}
      </Grid.Col>
    </Grid>
  );
};
export default PresencePage;
