import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IActivity } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
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

const Page = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IActivity | null>(null);
  const [deletingItem, setDeletingItem] = useState<IActivity | null>(null);

  const { data, error, mutate } = useSWR<IActivity[], string>(
    `${process.env.REACT_APP_API}/additional-activity`,
    fetcher
  );

  return (
    <>
      <Title order={1}>Teachers</Title>
      <Space h="xl" />
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <ItemsTable
              data={data}
              setEditingItem={setEditingItem}
              setDeletingItem={setDeletingItem}
            />
            {/* <div className="jsonout">{JSON.stringify(data, null, 4)}</div> */}
          </>
        ) : (
          <Text>No teachers exist.</Text>
        )
      ) : (
        <Loader />
      )}
      <Space h="lg" />
      {editingItem && (
        <EditModal
          item={editingItem}
          mutate={mutate}
          handleClose={() => setEditingItem(null)}
        />
      )}
      {deletingItem && (
        <DeleteModal
          item={deletingItem}
          mutate={mutate}
          handleClose={() => setDeletingItem(null)}
        />
      )}
      <AddModal open={showAddItem} setOpen={setShowAddItem} mutate={mutate} />
      {<Button onClick={() => setShowAddItem(true)}>Add teacher</Button>}
    </>
  );
};
export default Page;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
}: {
  data: IActivity[];
  setEditingItem: (arg0: IActivity) => void;
  setDeletingItem: (arg0: IActivity) => void;
}) => {
  const rows = data.map((item) => (
    <>
      <tr key={item.id}>
        <td>
          <Group spacing="sm">
            <div>
              <Text size="sm" weight={500}>
                {item.activityName}
              </Text>
              <Text color="dimmed" size="xs">
                ID: {item.id}
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
            <ActionIcon onClick={() => setEditingItem(item)}>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <Menu withinPortal transition="pop" withArrow position="left">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={16} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconTrash size={16} stroke={1.5} />}
                  color="red"
                  onClick={() => setDeletingItem(item)}
                >
                  Delete activity
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
          <th style={{ textAlign: "left" }}>Name</th>
          <th style={{ textAlign: "left" }}>Teachers</th>
          <th style={{ textAlign: "left" }}>Children</th>
          <th style={{ textAlign: "right" }}>Actions</th>
        </tr>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
