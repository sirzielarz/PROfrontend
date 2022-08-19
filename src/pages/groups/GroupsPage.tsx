import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Collapse, Loader } from "@mantine/core";
import { GroupDTO } from "../../interfaces/Entities";
import { useForm } from "@mantine/form";
import { useState } from "react";
import AddItem from "./AddItem";
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
import { IconPencil, IconTrash, IconDots, IconLetterC } from "@tabler/icons";

const GroupsPage = () => {
  const [open, setOpen] = useState(false);

  const { data, error, mutate } = useSWR<GroupDTO[], string>(
    `${process.env.REACT_APP_API}/group`,
    fetcher
  );

  // console.log("out", data);
  // const addItem = () => {};

  return (
    <>
      <Title order={1}>Groups</Title>
      <Space h="xl" />
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <GroupsTable data={data} />
            {/* <div className="jsonout">{JSON.stringify(data, null, 4)}</div> */}
          </>
        ) : (
          <Text>No groups exist.</Text>
        )
      ) : (
        <Loader />
      )}
      <Space h="lg" />
      <AddItem mutate={mutate} />
      {<Button onClick={addItem}>Add group</Button>}
    </>
  );
};
export default GroupsPage;

const addItem = () => {};

export const GroupsTable = ({ data }: { data: GroupDTO[] }) => {
  const rows = data.map((item) => (
    <>
      <tr>
        <th>Group name</th>
        <th>Teachers</th>
        <th>Children</th>
        <th>Actions</th>
      </tr>
      <tr key={item.id}>
        <td>
          <Group spacing="sm">
            <div>
              <Text size="sm" weight={500}>
                {item.groupName}
              </Text>
              <Text color="dimmed" size="xs">
                Group ID: {item.id}
              </Text>
            </div>
          </Group>
        </td>
        <td>
          <Text size="sm">
            {item.teachers?.map((t, i) => (
              <>
                {`${t.teacher.name} ${t.teacher.surname}`}
                {i + 1 < item.teachers?.length ? ", " : ""}
              </>
            ))}
          </Text>
          <Text size="xs" color="dimmed">
            {item.teachers.length ? `Total: ${item.children.length}` : ""}
          </Text>
        </td>
        <td>
          <Text size="sm">
            {item.children?.map((c, i) => (
              <>
                <Text span>
                  <>
                    {`${c.child.name} ${c.child.surname}`}
                    {i + 1 < item.children?.length ? ", " : ""}
                  </>
                </Text>
              </>
            ))}
          </Text>
          <Text size="xs" color="dimmed">
            {item.children.length ? `Total: ${item.children.length}` : ""}
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
    </>
  ));
  return (
    <ScrollArea>
      <Table sx={{}} verticalSpacing="md">
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
