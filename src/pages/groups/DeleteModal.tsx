import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { createGroup, deleteGroupItem, editGroupName } from "../../api/index";
import { IGroup } from "../../interfaces/Entities";

function DeleteGroupModal({
  group,
  mutate,
  handleClose,
}: {
  group: IGroup;
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
      groupName: group.groupName,
    },
  });

  async function deleteItem() {
    const updated = await deleteGroupItem(group.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Delete group">
        You are going to delete {group.groupName} group. Are you sure about
        that?
        <br />
        <Button color="red" onClick={deleteItem}>
          Delete {group.groupName}
        </Button>
      </Modal>
    </>
  );
}

export default DeleteGroupModal;
