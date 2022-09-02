import { useForm } from "@mantine/form";
import {
  Button,
  FileButton,
  FileInput,
  Group,
  Loader,
  Modal,
  Select,
  Space,
  Text,
} from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  APIPhoto,
  IGroup,
  IPhoto,
  IPhotoAlbum,
} from "../../interfaces/Entities";
import { IconCirclePlus, IconUpload } from "@tabler/icons";
import { addPhoto } from "../../api/photo";
import { useRef, useState } from "react";
import { fetcher } from "../../api/fetch";
import { sortByValueToSelect } from "../../helpers/utils";

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<IPhoto[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm({
    initialValues: {
      groupId: null,
      file: null,
    },
    // validate: {
    //   file: (value) =>
    //     value < 2
    //       ? "enter at least 2 characters"
    //       : value.length > 50
    //       ? "enter max 50 characters"
    //       : null,
    // },
  });
  const [value, setValue] = useState<string | null>(null);
  //get albums
  const { data: allItems, error: errorItems } = useSWR<IPhotoAlbum[], string>(
    `${process.env.REACT_APP_URL}/api/photo-album`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems)
    return <div>Failed to load groups to photo albums data...</div>;
  //iterate

  let allItemsData = allItems?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.albumName}`,
    };
  });
  //sort items data
  allItemsData?.sort(sortByValueToSelect);

  //save
  async function createItem(values: any) {
    console.log("values-from-FORM", values);

    const valuesToAPI = {
      id: Number(values.groupId),
      file: values.file,
    };

    console.log("values-to-API", valuesToAPI);

    const updated = await addPhoto(valuesToAPI);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create photo">
        <form onSubmit={form.onSubmit(createItem)}>
          <Select
            required
            label="Album"
            placeholder="select album"
            searchable
            nothingFound="No album to choose"
            data={allItemsData}
            value={value}
            onChange={setValue}
            {...form.getInputProps("groupId")}
          />

          <FileInput
            placeholder="click here and upload image file"
            label="Image file"
            description="File should be image type, for example: PNG, JPG"
            icon={<IconUpload size={14} />}
            accept="image/png,image/jpeg"
            {...form.getInputProps("file")}
          />

          <Space h={"xl"}></Space>
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Add photo
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
