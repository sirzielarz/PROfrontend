import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Space } from "@mantine/core";
import { KeyedMutator } from "swr";
import { IPhoto } from "../../interfaces/Entities";
import { IconTrash } from "@tabler/icons";
import { deleteAnnouncement } from "../../api/announcement";

function DeleteModal({
  item,
  mutate,
  handleClose,
}: {
  item: IPhoto;
  mutate: KeyedMutator<IPhoto[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      file: "",
    },
  });

  async function deleteItem() {
    const updated = await deleteAnnouncement(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Delete photo">
        You are going to delete announcement: <b>{item.fileName}</b>.
        <Space h={"lg"}></Space> Are you sure about that?
        <Space h={"lg"}></Space>
        <Button color="red" leftIcon={<IconTrash />} onClick={deleteItem}>
          Delete
        </Button>
      </Modal>
    </>
  );
}

export default DeleteModal;
