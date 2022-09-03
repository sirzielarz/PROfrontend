import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader, Stack } from "@mantine/core";
import {
  IAuthorizedPerson,
  AuthorizationChildToPickUpDTO,
} from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortAuthorized } from "../../helpers/utils";
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
  IconPlus,
  IconSettings,
} from "@tabler/icons";
import EditChildrenModal from "./EditChildrenModal";
// import ResetPasswordModal from "./ResetPasswordModal";
import DetailsModal from "./DetailsModal";
import AddChildrenModal from "./AddChildrenModal";
import DeleteChildrenModal from "./DeleteChildrenModal";

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
  const [addChildrenItem, setAddChildrenItem] =
    useState<IAuthorizedPerson | null>(null);

  const [editingPersonItem, setEditingPersonItem] =
    useState<IAuthorizedPerson | null>(null);
  const [editingChildItem, setEditingChildItem] =
    useState<AuthorizationChildToPickUpDTO | null>(null);

  const [deleteChildItem, setDeleteChildItem] =
    useState<AuthorizationChildToPickUpDTO | null>(null);

  const { data, error, mutate } = useSWR<IAuthorizedPerson[], string>(
    `${process.env.REACT_APP_URL}/api/authorized-person`,
    fetcher
  );

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
              setAddChildrenItem={setAddChildrenItem}
              setEditingChildItem={setEditingChildItem}
              setEditingPersonItem={setEditingPersonItem}
              setDeleteChildItem={setDeleteChildItem}
            />
            {/* {<div className="jsonout">{JSON.stringify(data, null, 4)}</div>} */}
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
      {deleteChildItem && (
        <DeleteChildrenModal
          item={deleteChildItem}
          mutate={mutate}
          handleClose={() => setDeleteChildItem(null)}
        />
      )}
      {editingPersonItem && editingChildItem && (
        <EditChildrenModal
          item={editingPersonItem}
          childItem={editingChildItem}
          mutate={mutate}
          handleClose={() => {
            setEditingPersonItem(null);
            setEditingChildItem(null);
          }}
        />
      )}
      {addChildrenItem && (
        <AddChildrenModal
          item={addChildrenItem}
          mutate={mutate}
          handleClose={() => setAddChildrenItem(null)}
        />
      )}
      <AddModal open={showAddItem} setOpen={setShowAddItem} mutate={mutate} />
      {
        <Button
          onClick={() => setShowAddItem(true)}
          leftIcon={<IconCirclePlus />}
        >
          Add authorized person
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
  setAddChildrenItem,
  setEditingChildItem,
  setDeleteChildItem,
  setEditingPersonItem,
}: {
  data: IAuthorizedPerson[];
  setEditingItem: (arg0: IAuthorizedPerson) => void;

  setDeletingItem: (arg0: IAuthorizedPerson) => void;
  setDetailsItem: (arg0: IAuthorizedPerson) => void;
  setAddChildrenItem: (arg0: IAuthorizedPerson) => void;
  setEditingChildItem: (arg0: AuthorizationChildToPickUpDTO) => void;
  setEditingPersonItem: (arg0: IAuthorizedPerson) => void;
  setDeleteChildItem: (arg0: AuthorizationChildToPickUpDTO) => void;
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
      <td key={item.id} align={"right"}>
        <Stack align="flex-end" spacing="xs">
          {item.authorizationsToPickUp.sort(sortAuthorized).map((c, i) => (
            <Group key={i}>
              <Text span inline weight={650}>
                {`${c.child.surname} ${c.child.name}`}
              </Text>
              <Text span inline size="xs">
                {`${c.authorizationDateFrom} to ${c.authorizationDateTo} `}
                {/* {i + 1 < item.authorizationsToPickUp?.length ? ", <br>" : ""} */}
              </Text>

              <Text size="xs">
                <Group spacing="xs">
                  <ActionIcon size={"xs"} color={"blue"}>
                    <IconSettings
                      onClick={() => {
                        setEditingPersonItem(item);
                        setEditingChildItem(c);
                      }}
                    />
                  </ActionIcon>

                  <ActionIcon size={"xs"}>
                    <IconTrash
                      color={"red"}
                      onClick={() => {
                        setDeleteChildItem(c);
                      }}
                    />
                  </ActionIcon>
                </Group>
              </Text>
            </Group>
          ))}
        </Stack>
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

              <Menu.Item
                icon={<IconPlus size={16} stroke={1.5} />}
                onClick={() => setAddChildrenItem(item)}
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
            <th style={{ textAlign: "right" }}>Children to pickup</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
