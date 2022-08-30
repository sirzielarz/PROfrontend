import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IChild } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortChildren, sortGroups } from "../../helpers/utils";
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
import {
  IconPencil,
  IconTrash,
  IconDots,
  IconListDetails,
  IconCirclePlus,
} from "@tabler/icons";
// import EditGroupsModal from "./EditGroupsModal";
import EditParentsModal from "./EditParentsModal";
// import ResetPasswordModal from "./ResetPasswordModal";
import DetailsModal from "./DetailsModal";
import EditGroupsModal from "./EditGroupsModal";
import EditActivitiesModal from "./EditActivitiesModal";

const ChildrenPage = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IChild | null>(null);
  const [detailsItem, setDetailsItem] = useState<IChild | null>(null);
  const [deletingItem, setDeletingItem] = useState<IChild | null>(null);
  const [editingGroupsItem, setEditingGroupsItem] = useState<IChild | null>(
    null
  );
  const [editingParentsItem, setEditingParentsItem] = useState<IChild | null>(
    null
  );
  const [editingActivitiesItem, setEditingActivitiesItem] =
    useState<IChild | null>(null);

  const { data, error, mutate } = useSWR<IChild[], string>(
    `${process.env.REACT_APP_URL}/api/child`,
    fetcher
  );
  //console.log("out", data);

  return (
    <>
      <Title order={1}>Children</Title>
      <Space h="xl" />
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <ItemsTable
              data={data}
              setEditingItem={setEditingItem}
              setDeletingItem={setDeletingItem}
              setDetailsItem={setDetailsItem}
              setEditingParentsItem={setEditingParentsItem}
              setEditingGroupsItem={setEditingGroupsItem}
              setEditingActivitiesItem={setEditingActivitiesItem}
            />
          </>
        ) : (
          <Text>No children exist.</Text>
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
      {detailsItem && (
        <DetailsModal
          item={detailsItem}
          mutate={mutate}
          handleEdit={() => setEditingItem(detailsItem)}
          handleClose={() => setDetailsItem(null)}
        />
      )}
      {editingGroupsItem && (
        <EditGroupsModal
          item={editingGroupsItem}
          mutate={mutate}
          handleClose={() => setEditingGroupsItem(null)}
        />
      )}
      {editingParentsItem && (
        <EditParentsModal
          item={editingParentsItem}
          mutate={mutate}
          handleClose={() => setEditingParentsItem(null)}
        />
      )}
      {editingActivitiesItem && (
        <EditActivitiesModal
          item={editingActivitiesItem}
          mutate={mutate}
          handleClose={() => setEditingActivitiesItem(null)}
        />
      )}
      <AddModal open={showAddItem} setOpen={setShowAddItem} mutate={mutate} />
      {
        <Button
          onClick={() => setShowAddItem(true)}
          leftIcon={<IconCirclePlus />}
        >
          Add child
        </Button>
      }
    </>
  );
};
export default ChildrenPage;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
  setDetailsItem,
  setEditingParentsItem,
  setEditingGroupsItem,
  setEditingActivitiesItem,
}: {
  data: IChild[];
  setEditingItem: (arg0: IChild) => void;
  setDeletingItem: (arg0: IChild) => void;
  setDetailsItem: (arg0: IChild) => void;
  setEditingParentsItem: (arg0: IChild) => void;
  setEditingGroupsItem: (arg0: IChild) => void;
  setEditingActivitiesItem: (arg0: IChild) => void;
}) => {
  const rows = data.map((item: IChild) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.surname} {item.name}
            </Text>
            <Text color="dimmed" size="xs">
              ID: {item.id}
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
      <td key={item.id}>
        <Text size="sm">
          {item.parents?.map((p, i) => (
            <Text span key={p.id}>
              <>
                {`${p.surname} ${p.name}`}
                {i + 1 < item.parents?.length ? ", " : ""}
              </>
            </Text>
          ))}
        </Text>
        <Text size="xs" color="dimmed">
          {item.parents.length
            ? `Total: ${item.parents.length}`
            : "No parents added"}
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
                icon={<IconListDetails size={16} stroke={1.5} />}
                onClick={() => setDetailsItem(item)}
              >
                Child details
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingItem(item)}
              >
                Edit child data
              </Menu.Item>
              {/* <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setPasswordItem(item)}
              >
                Reset password
              </Menu.Item> */}
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingGroupsItem(item)}
              >
                Edit groups
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingParentsItem(item)}
              >
                Edit parents
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
                Delete child
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
            <th style={{ textAlign: "left" }}>Child</th>
            {/* <th style={{ textAlign: "left" }}>Birthday</th> */}
            <th style={{ textAlign: "left" }}>Groups</th>
            <th style={{ textAlign: "left" }}>Parents</th>
            {/* <th style={{ textAlign: "left" }}>Children</th> */}
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
