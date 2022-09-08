import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Loader, Modal, Select, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { updatePhotoAlbum } from "../../api/photo-album/index";
import {
  APIPhotoAlbum,
  APIPhotoAlbumEdit,
  IGroup,
  IPhotoAlbum,
} from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";
import { sortByValueToSelect } from "../../helpers/utils";
import { fetcher } from "../../api/fetch";

function EditModal({
  item,
  mutate,
  handleClose,
}: {
  item: IPhotoAlbum;
  mutate: KeyedMutator<IPhotoAlbum[]>;
  handleClose: () => void;
}) {
  const [value, setValue] = useState<string>("");

  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      albumName: item.albumName,
      groupId: String(item.group.id),
    },
  });

  useEffect(() => {
    form.setFieldValue("groupId", String(item.group.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: allItems, error: errorItems } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );
  let allItemsData = allItems?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.groupName}`,
    };
  });
  //sort items data
  allItemsData?.sort(sortByValueToSelect);

  async function editItem(values: APIPhotoAlbumEdit) {
    const valuesToAPI: APIPhotoAlbum = {
      albumName: values.albumName,
      groupId: Number(values.groupId),
    };

    const updated = await updatePhotoAlbum(item.id, valuesToAPI);
    mutate(updated);
    form.reset();
    handleClose();
  }

  if (errorItems)
    return <div>Failed to load groups to announcement data...</div>;
  if (!allItems && !errorItems) return <Loader></Loader>;

  return (
    <>
      <Modal
        size={600}
        opened={open2}
        onClose={() => handleClose()}
        title="Edit photo album"
      >
        <form onSubmit={form.onSubmit(editItem)}>
          <TextInput
            required
            mb={12}
            label="Album name"
            placeholder="enter album name"
            {...form.getInputProps("albumName")}
          />

          <Select
            required
            label="Group"
            placeholder="select group"
            searchable
            nothingFound="No group to choose"
            data={allItemsData}
            value={value}
            onChange={setValue}
            {...form.getInputProps("groupId")}
          />

          <Space h="lg" />
          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
