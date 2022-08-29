import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IAuthorizedPerson } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortAuthorized, sortChildren } from "../../helpers/utils";
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
  IconView360,
  IconDetails,
  IconListDetails,
  IconCirclePlus,
  IconPlus,
} from "@tabler/icons";
import EditChildrenModal from "./EditChildrenModal";
// import ResetPasswordModal from "./ResetPasswordModal";
import DetailsModal from "./DetailsModal";
import { isTemplateExpression } from "typescript";

const AuthorizedPage = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IAuthorizedPerson | null>(
    null
  );
  const [detailsItem, setDetailsItem] = useState<IAuthorizedPerson | null>(
    null
  );

  const [deletingItem, setDeletingItem] = useState<IAuthorizedPerson | null>(
    null
  );
  // const [passwordItem, setPasswordItem] = useState<IAuthorizedPerson | null>(
  //   null
  // );

  const [editingChildrenItem, setEditingChildrenItem] =
    useState<IAuthorizedPerson | null>(null);

  const { data, error, mutate } = useSWR<IAuthorizedPerson[], string>(
    `${process.env.REACT_APP_URL}/api/authorized-person`,
    fetcher
  );
  //console.log("out", data);

  return (
    <>
      <Title order={1}>Authorized persons</Title>
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
              // setPasswordItem={setPasswordItem}
            />
            {<div className="jsonout">{JSON.stringify(data, null, 4)}</div>}
          </>
        ) : (
          <Text>No authorized persons exist.</Text>
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
      {/* {passwordItem && (
        <ResetPasswordModal
          item={passwordItem}
          mutate={mutate}
          handleClose={() => setPasswordItem(null)}
        />
      )} */}
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
export default AuthorizedPage;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
  setDetailsItem,
  setEditingChildrenItem,
}: // setPasswordItem,
{
  data: IAuthorizedPerson[];
  setEditingItem: (arg0: IAuthorizedPerson) => void;
  setDeletingItem: (arg0: IAuthorizedPerson) => void;
  setDetailsItem: (arg0: IAuthorizedPerson) => void;
  setEditingChildrenItem: (arg0: IAuthorizedPerson) => void;
  // setPasswordItem: (arg0: IAuthorizedPerson) => void;
}) => {
  const rows = data.map((item: IAuthorizedPerson) => (
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
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.identityDocumentNumber}
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
          {item.authorizationsToPickUp?.sort(sortAuthorized).map((c, i) => (
            <Text span key={c.child.id}>
              <>
                {`${c.child.surname} ${c.child.name} from: ${c.authorizationDateFrom} to: ${c.authorizationDateTo}`}
                {i + 1 < item.authorizationsToPickUp?.length ? ", <br>" : ""}
              </>
            </Text>
          ))}
        </Text>
        <Text size="xs" color="dimmed">
          {item.authorizationsToPickUp.length
            ? `Total: ${item.authorizationsToPickUp.length}`
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
                Authorized person details
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingItem(item)}
              >
                Edit authorized person
              </Menu.Item>
              {/* <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setPasswordItem(item)}
              >
                Reset password
              </Menu.Item> */}

              <Menu.Item
                icon={<IconPlus size={16} stroke={1.5} />}
                onClick={() => setEditingChildrenItem(item)}
              >
                Add children to pickup
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
                onClick={() => setDeletingItem(item)}
              >
                Delete authorized person
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
            <th style={{ textAlign: "left" }}>Authorized person</th>
            <th style={{ textAlign: "left" }}>Document number</th>
            {/* <th style={{ textAlign: "left" }}>Email</th> */}
            {/* <th style={{ textAlign: "left" }}>Groups</th> */}
            <th style={{ textAlign: "left" }}>Children to pickup</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
