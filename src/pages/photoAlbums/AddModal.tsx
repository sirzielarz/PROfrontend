import { useForm } from "@mantine/form";
import { Button, Loader, Modal, Select, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { addPhotoAlbum } from "../../api/photo-album/index";
import { IPhotoAlbum, APIPhotoAlbum, IGroup } from "../../interfaces/Entities";
import { IconCirclePlus } from "@tabler/icons";
import { sortByValueToSelect } from "../../helpers/utils";
import { useState } from "react";
import { fetcher } from "../../api/fetch";

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<IPhotoAlbum[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm<APIPhotoAlbum>({
    initialValues: {
      albumName: "",
      groupId: 0,
    },
    validate: {
      albumName: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
    },
  });

  const [value, setValue] = useState<string | null>(null);

  async function createItem(values: APIPhotoAlbum) {
    const updated = await addPhotoAlbum(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  const { data: allItems, error: errorItems } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems)
    return <div>Failed to load groups to announcement data...</div>;
  //iterate

  let allItemsData = allItems?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.groupName}`,
    };
  });
  //sort items data
  allItemsData?.sort(sortByValueToSelect);

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create photo album"
      >
        <form onSubmit={form.onSubmit(createItem)}>
          <TextInput
            required
            mb={12}
            label="Album name"
            placeholder="Enter album name"
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
          <Space h={"xl"}></Space>
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Create photo album
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
