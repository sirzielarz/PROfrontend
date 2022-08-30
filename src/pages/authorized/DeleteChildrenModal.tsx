import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Space } from "@mantine/core";
import { KeyedMutator } from "swr";
import { deleteAuthorizationToPickupEntry } from "../../api/authorization-to-pickup/index";
import {
  AuthorizationChildToPickUpDTO,
  IAuthorizedPerson,
} from "../../interfaces/Entities";
import { IconTrash } from "@tabler/icons";

function DeleteModal({
  item,
  mutate,
  handleClose,
}: {
  item: AuthorizationChildToPickUpDTO;
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
      id: item.id,
    },
  });

  async function deleteItem() {
    const updated = await deleteAuthorizationToPickupEntry(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Delete child from authorization pickup"
      >
        You are going to delete authorization to pickup for child:
        <b>
          {" "}
          {item.child.surname +
            " " +
            item.child.name +
            " - " +
            item.authorizationDateFrom +
            " to " +
            item.authorizationDateTo}
        </b>
        .<Space h={"lg"}></Space> Are you sure about that?
        <Space h={"lg"}></Space>
        <Button leftIcon={<IconTrash />} color="red" onClick={deleteItem}>
          Delete
        </Button>
      </Modal>
    </>
  );
}

export default DeleteModal;
