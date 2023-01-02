import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Space } from "@mantine/core";
import { KeyedMutator } from "swr";
import { deletePhoto } from "../../api/photo/index";
import { IPhotoAlbum, PhotoDTO } from "../../interfaces/Entities";
import { IconTrash } from "@tabler/icons";

function DeletePhotoModal({
  item,
  mutate,
  handleClose,
}: {
  item: PhotoDTO;
  mutate: KeyedMutator<IPhotoAlbum[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      id: item.id,
    },
  });

  async function deleteItem() {
    const updated = await deletePhoto(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Delete photo">
        You are going to delete photo file:<Space h={"lg"}></Space>
        <b>{"ID: " + item.id + " " + item.fileName}</b>.<Space h={"lg"}></Space>{" "}
        Are you sure about that?
        <Space h={"lg"}></Space>
        <Button leftIcon={<IconTrash />} color="red" onClick={deleteItem}>
          Delete
        </Button>
      </Modal>
    </>
  );
}

export default DeletePhotoModal;
