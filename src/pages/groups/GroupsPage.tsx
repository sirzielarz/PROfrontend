import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { GroupDTO } from "../../interfaces/Entities";
import { useState } from "react";
import AddGroupModal from "./AddGroupModal";
import EditGroupModal from "./EditGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";
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

const GroupsPage = () => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [editingGroup, setEditingGroup] = useState<GroupDTO | null>(null);
  const [deletingGroup, setDeletingGroup] = useState<GroupDTO | null>(null);

  const { data, error, mutate } = useSWR<GroupDTO[], string>(
    `${process.env.REACT_APP_API}/group`,
    fetcher
  );
  // console.log("out", data);

  return (
    <>
      <Title order={1}>Groups</Title>
      <Space h="xl" />
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <GroupsTable
              data={data}
              setEditingGroup={setEditingGroup}
              setDeletingGroup={setDeletingGroup}
            />
            {/* <div className="jsonout">{JSON.stringify(data, null, 4)}</div> */}
          </>
        ) : (
          <Text>No groups exist.</Text>
        )
      ) : (
        <Loader />
      )}
      <Space h="lg" />
      {editingGroup && (
        <EditGroupModal
          group={editingGroup}
          mutate={mutate}
          handleClose={() => setEditingGroup(null)}
        />
      )}
      {deletingGroup && (
        <DeleteGroupModal
          group={deletingGroup}
          mutate={mutate}
          handleClose={() => setDeletingGroup(null)}
        />
      )}
      <AddGroupModal
        open={showAddGroup}
        setOpen={setShowAddGroup}
        mutate={mutate}
      />
      {<Button onClick={() => setShowAddGroup(true)}>Add group</Button>}
    </>
  );
};
export default GroupsPage;

export const GroupsTable = ({
  data,
  setEditingGroup,
  setDeletingGroup,
}: {
  data: GroupDTO[];
  setEditingGroup: (arg0: GroupDTO) => void;
  setDeletingGroup: (arg0: GroupDTO) => void;
}) => {
  const rows = data.map((item) => (
    <>
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
            {item.teachers.length
              ? `Total: ${item.teachers.length}`
              : "No teachers added"}
          </Text>
        </td>
        <td>
          <Text size="sm">
            {item.children?.map((c, i) => (
              <>
                <Text span key={c.child.id}>
                  <>
                    {`${c.child.name} ${c.child.surname}`}
                    {i + 1 < item.children?.length ? ", " : ""}
                  </>
                </Text>
              </>
            ))}
          </Text>
          <Text size="xs" color="dimmed">
            {item.children.length
              ? `Total: ${item.children.length}`
              : "No children added"}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon onClick={() => setEditingGroup(item)}>
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
                  onClick={() => setDeletingGroup(item)}
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
      <Table sx={{}} verticalSpacing="md" highlightOnHover>
        <tr>
          <th style={{ textAlign: "left" }}>Group name</th>
          <th style={{ textAlign: "left" }}>Teachers</th>
          <th style={{ textAlign: "left" }}>Children</th>
          <th style={{ textAlign: "right" }}>Actions</th>
        </tr>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
