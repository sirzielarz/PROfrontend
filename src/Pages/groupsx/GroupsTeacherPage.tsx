import useSWR from "swr";
import useRequest from "../../apix/useRequest";
import { fetcher } from "../../apix/fetch";
import { Button, Loader } from "@mantine/core";
import { Group as IGroupa, Teacher } from "../../interfacesx/RecordEntities";
import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Title,
  Text,
  Space,
  Table,
  Group,
  ActionIcon,
  Menu,
  ScrollArea,
} from "@mantine/core";
import { IconPencil, IconTrash, IconDots } from "@tabler/icons";

export interface IGroupTeacher {
  id: number;
  kindergartenGroup: {
    id: number;
    groupName: string;
  };
  teacher: {
    id: number;
    name: string;
    surname: string;
  };
}

const GroupsPage = () => {
  const { data, error } = useSWR<IGroupTeacher[], string>(
    `${process.env.REACT_APP_API}/group-teacher`,
    fetcher
  );

  const addItem = () => {};

  return (
    <>
      <Title order={1}>Groups-Teacher</Title>
      <Space h="xl" />
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <GroupsTable data={data} />
            <div className="jsonout">{JSON.stringify(data, null, 4)}</div>
          </>
        ) : (
          <Text>No groups exist.</Text>
        )
      ) : (
        <Loader />
      )}
      <Space h="lg" />
      <Button onClick={addItem}>Add group</Button>
    </>
  );
};
export default GroupsPage;

export const GroupsTable = ({ data }: { data: IGroupTeacher[] }) => {
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.kindergartenGroup.groupName}
            </Text>
            <Text color="dimmed" size="xs">
              Groupname
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">
          {item.teacher.name} {item.teacher.surname}
        </Text>
        <Text size="xs" color="dimmed">
          Teacher
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <Menu withinPortal transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
              >
                Delete group
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));
  return (
    <ScrollArea>
      <Table sx={{ maxWidth: 500 }} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
