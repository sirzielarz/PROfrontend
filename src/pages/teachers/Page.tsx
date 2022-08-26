import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { ITeacher } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import {
  sortTeachers,
  sortChildren,
  sortGroups,
  sortActivities,
} from "../../helpers/utils";
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
import EditGroupsModal from "./EditGroupsModal";
import EditTeacherActivitiesModal from "./EditActivitiesModal";

const Page = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<ITeacher | null>(null);
  const [deletingItem, setDeletingItem] = useState<ITeacher | null>(null);
  const [editingGroupsItem, setEditingGroupsItem] = useState<ITeacher | null>(
    null
  );
  const [editingActivitiesItem, setEditingActivitiesItem] =
    useState<ITeacher | null>(null);

  const { data, error, mutate } = useSWR<ITeacher[], string>(
    `${process.env.REACT_APP_URL}/api/teacher`,
    fetcher
  );
  //console.log("out", data);

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
              setEditingGroupsItem={setEditingGroupsItem}
              setEditingActivitiesItem={setEditingActivitiesItem}
            />
            {/* {<div className="jsonout">{JSON.stringify(data, null, 4)}</div>} */}
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
      {editingGroupsItem && (
        <EditGroupsModal
          item={editingGroupsItem}
          mutate={mutate}
          handleClose={() => setEditingGroupsItem(null)}
        />
      )}
      {editingActivitiesItem && (
        <EditTeacherActivitiesModal
          item={editingActivitiesItem}
          mutate={mutate}
          handleClose={() => setEditingActivitiesItem(null)}
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
  setEditingGroupsItem,
  setEditingActivitiesItem,
}: {
  data: ITeacher[];
  setEditingItem: (arg0: ITeacher) => void;
  setDeletingItem: (arg0: ITeacher) => void;
  setEditingGroupsItem: (arg0: ITeacher) => void;
  setEditingActivitiesItem: (arg0: ITeacher) => void;
}) => {
  const rows = data.map((item: ITeacher) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.surname}
            </Text>
            <Text color="dimmed" size="xs">
              ID: {item.id}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">
          {item.groups.sort(sortGroups).map((g, i) => (
            <Text span key={g.kindergartenGroup.id}>
              <>
                {`${g.kindergartenGroup.groupName}`}
                {i + 1 < item.groups?.length ? ", " : ""}
              </>
            </Text>
          ))}
        </Text>
        <Text size="xs" color="dimmed">
          {item.groups.length
            ? `Total: ${item.groups.length}`
            : "No groups added"}
        </Text>
      </td>
      <td>
        <Text size="sm">
          {item.additionalActivities.sort(sortActivities)?.map((a, i) => (
            <Text span key={a.id}>
              <>
                {`${a.additionalActivity.activityName}`}
                {i + 1 < item.additionalActivities?.length ? ", " : ""}
              </>
            </Text>
          ))}
        </Text>
        <Text size="xs" color="dimmed">
          {item.additionalActivities.length
            ? `Total: ${item.additionalActivities.length}`
            : "No additional activities added"}
        </Text>
      </td>
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
                Edit teacher data
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingGroupsItem(item)}
              >
                Edit groups
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingActivitiesItem(item)}
              >
                Edit additional activities
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
                onClick={() => setDeletingItem(item)}
              >
                Delete teacher
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
            <th style={{ textAlign: "left" }}>Surname</th>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Email</th>
            <th style={{ textAlign: "left" }}>Groups</th>
            <th style={{ textAlign: "left" }}>Additional activities</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
