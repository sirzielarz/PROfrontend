import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Chip, Grid, Loader } from "@mantine/core";
import { IGroup, IPresence } from "../../interfaces/Entities";
import { useEffect, useState } from "react";
import { getPrettyDate } from "./../../helpers/utils";

import { sortTeachers, sortChildren } from "../../helpers/utils";
import { Title, Text, Space, Table, Group, ScrollArea } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";

const PresencePage = () => {
  const [groupIDSelected, setGroupIDSelected] = useState<string>();
  const [groupNameSelected, setGroupNameSelected] = useState<string>();
  const [dateSelected, setDateSelected] = useState<Date | null>(new Date());

  useEffect(() => {
    const groupName =
      dataGroups && groupIDSelected
        ? dataGroups.find((x) => x.id === Number(groupIDSelected))?.groupName
        : null;

    if (groupName) {
      setGroupNameSelected(groupName);
    }
  }, [groupIDSelected]);

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
        {chipsItems}
      </Chip.Group>
    );
  };

  return (
    <Grid>
      <Grid.Col span={2}>
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

        <Text>Presence fetched data: {}</Text>
        <div className="jsonout">{JSON.stringify(dataPresence, null, 4)}</div>
      </Grid.Col>
      <Grid.Col span={6}>
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

              <div className="jsonout">
                {JSON.stringify(dataPresence, null, 4)}
              </div>
              {/* // eswssssssssssssssssssssssssss */}
            </>
          )
        ) : (
          "Please select group and date..."
        )}
      </Grid.Col>
    </Grid>
  );
};
export default PresencePage;
