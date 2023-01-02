import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IActivity } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortTeachers, sortChildren } from "../../helpers/utils";
import {
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
import useAuth from "../../api/useAuth";

const Page = () => {
  const { isAdmin } = useAuth();
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IActivity | null>(null);
  const [deletingItem, setDeletingItem] = useState<IActivity | null>(null);
  const [editingChildrenItem, setEditingChildrenItem] =
    useState<IActivity | null>(null);
  const [editingTeachersItem, setEditingTeachersItem] =
    useState<IActivity | null>(null);

  const { data, error, mutate, isValidating } = useSWR<IActivity[], string>(
    `${process.env.REACT_APP_URL}/api/additional-activity`,
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
  const pageTitleString = "Additional activities";
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
      <Space h="xl" />
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <ItemsTable
              data={data}
              setEditingItem={setEditingItem}
              setDeletingItem={setDeletingItem}
              setEditingChildrenItem={setEditingChildrenItem}
              setEditingTeachersItem={setEditingTeachersItem}
              isAdmin={isAdmin}
            />
            {/* <div className="jsonout">{JSON.stringify(data, null, 4)}</div> */}
          </>
        ) : (
          <Text>No additional activities exist.</Text>
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
      {isAdmin && (
        <Button
          leftIcon={<IconCirclePlus />}
          onClick={() => setShowAddItem(true)}
        >
          Add additional activity
        </Button>
      )}
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
  isAdmin,
}: {
  data: IActivity[];
  setEditingItem: (arg0: IActivity) => void;
  setDeletingItem: (arg0: IActivity) => void;
  setEditingChildrenItem: (arg0: IActivity) => void;
  setEditingTeachersItem: (arg0: IActivity) => void;
  isAdmin?: boolean;
}) => {
  const rows = data.map((item) => (
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
      <td>
        <Text size="sm">
          {item.children?.sort(sortChildren).map((c, i) => (
            <Text span key={c.child.id}>
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
      {isAdmin ? (
        <td>
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
                  Edit activity name
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
                  Delete activity
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </td>
      ) : (
        ""
      )}
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
            {isAdmin && <th style={{ textAlign: "right" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
