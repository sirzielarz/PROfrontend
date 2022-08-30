import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Space } from "@mantine/core";
import { KeyedMutator } from "swr";
import { deleteAuthorizedPerson } from "../../api/authorized-person/index";
import { IAuthorizedPerson } from "../../interfaces/Entities";
import { IconTrash } from "@tabler/icons";

function DeleteModal({
  item,
  mutate,
  handleClose,
}: {
  item: IAuthorizedPerson;
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      name: item.name,
    },
  });

  async function deleteItem() {
    const updated = await deleteAuthorizedPerson(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Delete authorized person"
      >
        You are going to delete authorized person:
        <b> {item.surname + " " + item.name}</b>.<Space h={"lg"}></Space> Are
        you sure about that?
        <Space h={"lg"}></Space>
        <Button leftIcon={<IconTrash />} color="red" onClick={deleteItem}>
          Delete {item.surname + " " + item.name}
        </Button>
      </Modal>
    </>
  );
}

export default DeleteModal;
