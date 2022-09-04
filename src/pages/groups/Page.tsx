import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IGroup } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortTeachers, sortChildren } from "../../helpers/utils";
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
import { IconPencil, IconTrash, IconDots, IconCirclePlus } from "@tabler/icons";
import EditChildrenModal from "./EditChildrenModal";
import EditTeachersModal from "./EditTeachersModal";
import SiteHeader from "../../components/SiteHeader";

const Page = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IGroup | null>(null);
  const [deletingItem, setDeletingItem] = useState<IGroup | null>(null);
  const [editingChildrenItem, setEditingChildrenItem] = useState<IGroup | null>(
    null
  );
  const [editingTeachersItem, setEditingTeachersItem] = useState<IGroup | null>(
    null
  );

  const { data, error, mutate, isValidating } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );
  const pageTitleString = "Groups";
  if (error) return <SiteHeader title={pageTitleString} error={error} />;
  if ((!data && !error) || isValidating)
    return (
      <>
        <SiteHeader title={pageTitleString} error={error} />
        <Loader />
      </>
    );

  return (
    <>
      <SiteHeader title={pageTitleString} error={error} />
      {data ? (
        data.length > 0 ? (
          <>
            <ItemsTable
              data={data}
              setEditingItem={setEditingItem}
              setDeletingItem={setDeletingItem}
              setEditingChildrenItem={setEditingChildrenItem}
              setEditingTeachersItem={setEditingTeachersItem}
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
      {editingChildrenItem && (
        <EditChildrenModal
          item={editingChildrenItem}
          mutate={mutate}
          handleClose={() => setEditingChildrenItem(null)}
        />
      )}
      {editingTeachersItem && (
        <EditTeachersModal
          item={editingTeachersItem}
          mutate={mutate}
          handleClose={() => setEditingTeachersItem(null)}
        />
      )}
      <AddModal open={showAddItem} setOpen={setShowAddItem} mutate={mutate} />
      {
        <Button
          onClick={() => setShowAddItem(true)}
          leftIcon={<IconCirclePlus />}
        >
          Add group
        </Button>
      }
    </>
  );
};
export default Page;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
  setEditingChildrenItem,
  setEditingTeachersItem,
}: {
  data: IGroup[];
  setEditingItem: (arg0: IGroup) => void;
  setDeletingItem: (arg0: IGroup) => void;
  setEditingChildrenItem: (arg0: IGroup) => void;
  setEditingTeachersItem: (arg0: IGroup) => void;
}) => {
  const rows = data.map((item) => (
    <tr key={"tr_" + item.id}>
      <td key={"1_" + item.id}>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.groupName}
            </Text>
            <Text color="dimmed" size="xs">
              ID: {item.id}
            </Text>
          </div>
        </Group>
      </td>
      <td key={"2_" + item.id}>
        <Text size="sm">
          {item.teachers?.sort(sortTeachers).map((t, i) => (
            <Text span key={t.teacher.id}>
              <>
                {`${t.teacher.surname} ${t.teacher.name}`}
                {i + 1 < item.teachers?.length ? ", " : ""}
              </>
            </Text>
          ))}
        </Text>
        <Text size="xs" color="dimmed">
          {item.teachers.length
            ? `Total: ${item.teachers.length}`
            : "No teachers added"}
        </Text>
      </td>
      <td key={"3_" + item.id}>
        <Text size="sm">
          {item.children?.sort(sortChildren).map((c, i) => (
            <Text span key={"child_" + c.child.id}>
              <>
                {`${c.child.surname} ${c.child.name}`}
                {i + 1 < item.children?.length ? ", " : ""}
              </>
            </Text>
          ))}
        </Text>
        <Text size="xs" color="dimmed">
          {item.children.length
            ? `Total: ${item.children.length}`
            : "No children added"}
        </Text>
      </td>
      <td key={"4_" + item.id}>
        <Group spacing={0} position="right">
          <Menu withinPortal transition="pop" withArrow position="left">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingItem(item)}
              >
                Edit group name
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingTeachersItem(item)}
              >
                Edit teachers
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingChildrenItem(item)}
              >
                Edit children
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
                onClick={() => setDeletingItem(item)}
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
      <Table sx={{}} verticalSpacing="md" highlightOnHover>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Teachers</th>
            <th style={{ textAlign: "left" }}>Children</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
