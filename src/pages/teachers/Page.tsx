import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { ITeacher } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortGroups, sortActivities } from "../../helpers/utils";
import {
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
import EditGroupsModal from "./EditGroupsModal";
import EditTeacherActivitiesModal from "./EditActivitiesModal";
import ResetPasswordModal from "./ResetPasswordModal";
import DetailsModal from "./DetailsModal";
import SiteHeader from "../../components/SiteHeader";

const TeachersPage = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [detailsItem, setDetailsItem] = useState<ITeacher | null>(null);
  const [editingItem, setEditingItem] = useState<ITeacher | null>(null);
  const [deletingItem, setDeletingItem] = useState<ITeacher | null>(null);
  const [passwordItem, setPasswordItem] = useState<ITeacher | null>(null);
  const [editingGroupsItem, setEditingGroupsItem] = useState<ITeacher | null>(
    null
  );
  const [editingActivitiesItem, setEditingActivitiesItem] =
    useState<ITeacher | null>(null);

  const { data, error, mutate, isValidating } = useSWR<ITeacher[], string>(
    `${process.env.REACT_APP_URL}/api/teacher`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );
  const pageTitleString = "Teachers";
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
      {error ? error : ""}
      {data ? (
        data.length > 0 ? (
          <>
            <ItemsTable
              data={data}
              setEditingItem={setEditingItem}
              setDetailsItem={setDetailsItem}
              setDeletingItem={setDeletingItem}
              setEditingGroupsItem={setEditingGroupsItem}
              setEditingActivitiesItem={setEditingActivitiesItem}
              setPasswordItem={setPasswordItem}
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
      {passwordItem && (
        <ResetPasswordModal
          item={passwordItem}
          mutate={mutate}
          handleClose={() => setPasswordItem(null)}
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
      {editingActivitiesItem && (
        <EditTeacherActivitiesModal
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
          Add teacher
        </Button>
      }
    </>
  );
};
export default TeachersPage;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDetailsItem,
  setDeletingItem,
  setEditingGroupsItem,
  setEditingActivitiesItem,
  setPasswordItem,
}: {
  data: ITeacher[];
  setEditingItem: (arg0: ITeacher) => void;
  setDetailsItem: (arg0: ITeacher) => void;
  setDeletingItem: (arg0: ITeacher) => void;
  setEditingGroupsItem: (arg0: ITeacher) => void;
  setEditingActivitiesItem: (arg0: ITeacher) => void;
  setPasswordItem: (arg0: ITeacher) => void;
}) => {
  const rows = data.map((item: ITeacher) => (
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
                icon={<IconListDetails size={16} stroke={1.5} />}
                onClick={() => setDetailsItem(item)}
              >
                Teacher details
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingItem(item)}
              >
                Edit teacher data
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setPasswordItem(item)}
              >
                Reset password
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
            <th style={{ textAlign: "left" }}>Teacher</th>
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
