import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IParent } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortChildren } from "../../helpers/utils";
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
import EditChildrenModal from "./EditChildrenModal";
import ResetPasswordModal from "./ResetPasswordModal";
import DetailsModal from "./DetailsModal";

const ParentsPage = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IParent | null>(null);
  const [detailsItem, setDetailsItem] = useState<IParent | null>(null);

  const [deletingItem, setDeletingItem] = useState<IParent | null>(null);
  const [passwordItem, setPasswordItem] = useState<IParent | null>(null);

  const [editingChildrenItem, setEditingChildrenItem] =
    useState<IParent | null>(null);

  const { data, error, mutate } = useSWR<IParent[], string>(
    `${process.env.REACT_APP_URL}/api/parent`,
    fetcher
  );

  return (
    <>
      <Title order={1}>Parents</Title>
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
              setEditingChildrenItem={setEditingChildrenItem}
              setPasswordItem={setPasswordItem}
            />
            {/* {<div className="jsonout">{JSON.stringify(data, null, 4)}</div>} */}
          </>
        ) : (
          <Text>No parents exist.</Text>
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
      {passwordItem && (
        <ResetPasswordModal
          item={passwordItem}
          mutate={mutate}
          handleClose={() => setPasswordItem(null)}
        />
      )}
      {editingChildrenItem && (
        <EditChildrenModal
          item={editingChildrenItem}
          mutate={mutate}
          handleClose={() => setEditingChildrenItem(null)}
        />
      )}
      <AddModal open={showAddItem} setOpen={setShowAddItem} mutate={mutate} />
      {
        <Button
          onClick={() => setShowAddItem(true)}
          leftIcon={<IconCirclePlus />}
        >
          Add parent
        </Button>
      }
    </>
  );
};
export default ParentsPage;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
  setDetailsItem,
  setEditingChildrenItem,
  setPasswordItem,
}: {
  data: IParent[];
  setEditingItem: (arg0: IParent) => void;
  setDeletingItem: (arg0: IParent) => void;
  setDetailsItem: (arg0: IParent) => void;
  setEditingChildrenItem: (arg0: IParent) => void;
  setPasswordItem: (arg0: IParent) => void;
}) => {
  const rows = data.map((item: IParent) => (
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
      {/* <td>
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
      </td> */}
      <td key={item.id}>
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
                Parent details
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingItem(item)}
              >
                Edit parent data
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setPasswordItem(item)}
              >
                Reset password
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
                Delete parent
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
            {/* <th style={{ textAlign: "left" }}>Groups</th> */}
            <th style={{ textAlign: "left" }}>Children</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
