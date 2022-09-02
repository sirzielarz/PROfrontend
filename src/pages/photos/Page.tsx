import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IPhoto } from "../../interfaces/Entities";
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
import { IconPencil, IconTrash, IconDots, IconCirclePlus } from "@tabler/icons";

const PhotosPage = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IPhoto | null>(null);
  const [deletingItem, setDeletingItem] = useState<IPhoto | null>(null);

  const { data, error, mutate } = useSWR<IPhoto[], string>(
    `${process.env.REACT_APP_URL}/api/photo`,
    fetcher
  );

  return (
    <>
      <Title order={1}>Photos</Title>
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
          </>
        ) : (
          <Text>No photos exist.</Text>
        )
      ) : (
        <Loader />
      )}
      <Space h="lg" />

      {/* {editingItem && (
        <EditModal
          item={editingItem}
          mutate={mutate}
          handleClose={() => setEditingItem(null)}
        />
      )} */}
      {/* {deletingItem && (
        <DeleteModal
          item={deletingItem}
          mutate={mutate}
          handleClose={() => setDeletingItem(null)}
        />
      )} */}
      <AddModal open={showAddItem} setOpen={setShowAddItem} mutate={mutate} />
      {
        <Button
          leftIcon={<IconCirclePlus />}
          onClick={() => setShowAddItem(true)}
        >
          Add photo
        </Button>
      }
    </>
  );
};
export default PhotosPage;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
}: {
  data: IPhoto[];
  setEditingItem: (arg0: IPhoto) => void;
  setDeletingItem: (arg0: IPhoto) => void;
}) => {
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.fileName}
            </Text>
          </div>
        </Group>
      </td>
      {/* <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.announcementText}
            </Text>
          </div>
        </Group>
      </td> */}
      {/* <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.kindergartenGroup.groupName}
            </Text>
          </div>
        </Group>
      </td> */}
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
                Edit photo
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
                onClick={() => setDeletingItem(item)}
              >
                Delete photo
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
            <th style={{ textAlign: "left" }}>File</th>
            {/* <th style={{ textAlign: "left" }}>Announcement</th>
            <th style={{ textAlign: "left" }}>Group</th> */}
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
