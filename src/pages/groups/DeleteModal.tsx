import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal } from "@mantine/core";
import { KeyedMutator } from "swr";
import { deleteGroupItem } from "../../api/index";
import { IGroup } from "../../interfaces/Entities";

function DeleteModal({
  item,
  mutate,
  handleClose,
}: {
  item: IGroup;
  mutate: KeyedMutator<IGroup[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      groupName: item.groupName,
    },
  });

  async function deleteItem() {
    const updated = await deleteGroupItem(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Delete group">
        You are going to delete {item.groupName} group. Are you sure about that?
        <br />
        <Button color="red" onClick={deleteItem}>
          Delete {item.groupName}
        </Button>
      </Modal>
    </>
  );
}

export default DeleteModal;
