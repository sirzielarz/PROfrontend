import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader, Stack } from "@mantine/core";
import { IPhotoAlbum, PhotoDTO } from "../../interfaces/Entities";
import { useState } from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { sortByID } from "../../helpers/utils";
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
  IconPlus,
  IconSearch,
} from "@tabler/icons";

import DetailsModal from "./DetailsModal";
import EditGroupsModal from "./EditGroupsModal";
import EditActivitiesModal from "./EditActivitiesModal";
import AddPhotoModal from "./AddPhotoModal";
import DeletePhotoModal from "./DeletePhotoModal";
import useAuth from "../../api/useAuth";
import SiteHeader from "../../components/SiteHeader";

const PhotoAlbumsPage = () => {
  const { isParent } = useAuth();
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IPhotoAlbum | null>(null);
  const [detailsItem, setDetailsItem] = useState<IPhotoAlbum | null>(null);
  const [deletingItem, setDeletingItem] = useState<IPhotoAlbum | null>(null);

  const [editingGroupsItem, setEditingGroupsItem] =
    useState<IPhotoAlbum | null>(null);
  const [editingActivitiesItem, setEditingActivitiesItem] =
    useState<IPhotoAlbum | null>(null);

  const [addingPhotoModal, setAddingPhotoModal] = useState<IPhotoAlbum | null>(
    null
  );
  const [deletingPhotoModal, setDeletingPhotoModal] = useState<PhotoDTO | null>(
    null
  );

  const { data, error, mutate, isValidating } = useSWR<IPhotoAlbum[], string>(
    isParent ? null : `${process.env.REACT_APP_URL}/api/photo-album`,
    fetcher
  );
  const pageTitleString = "Photo albums";
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
          //filter data start
          //filter data stop
          <>
            <ItemsTable
              data={data}
              setEditingItem={setEditingItem}
              setDeletingItem={setDeletingItem}
              setDetailsItem={setDetailsItem}
              setEditingGroupsItem={setEditingGroupsItem}
              setEditingActivitiesItem={setEditingActivitiesItem}
              setAddingPhotoModal={setAddingPhotoModal}
              setDeletingPhotoModal={setDeletingPhotoModal}
            />
          </>
        ) : (
          <Text>No photo albums exist.</Text>
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

      {addingPhotoModal && (
        <AddPhotoModal
          item={addingPhotoModal}
          mutate={mutate}
          handleClose={() => setAddingPhotoModal(null)}
        />
      )}

      {deletingPhotoModal && (
        <DeletePhotoModal
          item={deletingPhotoModal}
          mutate={mutate}
          handleClose={() => setDeletingPhotoModal(null)}
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
        <EditActivitiesModal
          item={editingActivitiesItem}
          mutate={mutate}
          handleClose={() => setEditingActivitiesItem(null)}
        />
      )}
      {!isParent && (
        <>
          <AddModal
            open={showAddItem}
            setOpen={setShowAddItem}
            mutate={mutate}
          />

          {
            <Button
              onClick={() => setShowAddItem(true)}
              leftIcon={<IconCirclePlus />}
            >
              Add photo album
            </Button>
          }
        </>
      )}
    </>
  );
};
export default PhotoAlbumsPage;

export const ItemsTable = ({
  data,
  setEditingItem,
  setDeletingItem,
  setDetailsItem,
  setEditingGroupsItem,
  setEditingActivitiesItem,
  setAddingPhotoModal,
  setDeletingPhotoModal,
}: {
  data: IPhotoAlbum[];
  setEditingItem: (arg0: IPhotoAlbum) => void;
  setDeletingItem: (arg0: IPhotoAlbum) => void;
  setDetailsItem: (arg0: IPhotoAlbum) => void;
  setEditingGroupsItem: (arg0: IPhotoAlbum) => void;
  setEditingActivitiesItem: (arg0: IPhotoAlbum) => void;
  setAddingPhotoModal: (arg0: IPhotoAlbum) => void;
  setDeletingPhotoModal: (arg0: PhotoDTO) => void;
}) => {
  const rows = data.map((item: IPhotoAlbum) => (
    <tr key={"1_" + item.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.albumName}
            </Text>
            <Text color={"dimmed"} size={"xs"}>
              ID: {item.id}
            </Text>
          </div>
        </Group>
      </td>
      <td key={"2_" + item.id}>
        <Text size={"sm"}>{`${item.group.groupName}`}</Text>
        {item.group.groupName ? (
          ""
        ) : (
          <>
            <Text size={"xs"} color={"dimmed"}>
              No group added
            </Text>
          </>
        )}
      </td>
      <td key={"3_" + item.id} align={"left"}>
        <Stack align={"left"} spacing={"xs"}>
          {item.photos.sort(sortByID).map((x, i) => (
            <Group key={i}>
              <Text size={"xs"}>
                <Group spacing={"xs"}>
                  <ActionIcon
                    size={"xs"}
                    color={"blue"}
                    component="a"
                    href={x.url}
                    target={"_blank"}
                  >
                    <IconSearch />
                  </ActionIcon>

                  <ActionIcon size={"xs"}>
                    <IconTrash
                      color={"red"}
                      onClick={() => {
                        setDeletingPhotoModal(x);
                      }}
                    />
                  </ActionIcon>
                </Group>
              </Text>
              <Text span inline weight={650}>
                {`ID: ${x.id} ${x.fileName}`}
              </Text>
            </Group>
          ))}
        </Stack>
        <Space h={"xs"} />
        <Text size={"xs"} color={"dimmed"}>
          {item.photos.length
            ? `Total: ${item.photos.length}`
            : "No photos added"}
        </Text>
      </td>
      <td key={"4_" + item.id}>
        <Group spacing={0} position={"right"}>
          <Menu withinPortal transition="pop" withArrow position={"left"}>
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
                Photo album details
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={16} stroke={1.5} />}
                onClick={() => setEditingItem(item)}
              >
                Edit photo album data
              </Menu.Item>
              <Menu.Item
                icon={<IconPlus size={16} stroke={1.5} />}
                onClick={() => setAddingPhotoModal(item)}
              >
                Add photo to album
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={16} stroke={1.5} />}
                color="red"
                onClick={() => setDeletingItem(item)}
              >
                Delete photo album
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
            <th style={{ textAlign: "left" }}>Album name</th>
            <th style={{ textAlign: "left" }}>Group</th>
            <th style={{ textAlign: "left" }}>Photos</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {/* <div className="jsonout">{JSON.stringify(data, null, 4)}</div> */}
    </ScrollArea>
  );
};
