import { useForm } from "@mantine/form";
import { Button, FileInput, Loader, Modal, Select, Space } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { IPhotoAlbum } from "../../interfaces/Entities";
import { IconCirclePlus, IconUpload } from "@tabler/icons";
import { addPhoto } from "../../api/photo";
import { useLayoutEffect, useRef, useState } from "react";
import { fetcher } from "../../api/fetch";
import { sortByValueToSelect } from "../../helpers/utils";

function AddPhotoModal({
  item,
  mutate,
  handleClose,
}: {
  item: IPhotoAlbum;
  mutate: KeyedMutator<IPhotoAlbum[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const [open2, setOpen2] = useState(false);

  const form = useForm({
    initialValues: {
      file: null,
    },
  });

  async function createItem(values: any) {
    const valuesToAPI = {
      id: item.id, //album id
      file: values.file, //image file
    };

    console.log("values-to-API", valuesToAPI);

    const updated = await addPhoto(valuesToAPI);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Create photo">
        <form onSubmit={form.onSubmit(createItem)}>
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

export default AddPhotoModal;
