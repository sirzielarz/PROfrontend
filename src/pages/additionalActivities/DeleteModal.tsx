import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Space } from "@mantine/core";
import { KeyedMutator } from "swr";
import { deleteActivityItem } from "../../api/additional-activity/index";
import { IActivity } from "../../interfaces/Entities";
import { IconTrash } from "@tabler/icons";

function DeleteModal({
  item,
  mutate,
  handleClose,
}: {
  item: IActivity;
  mutate: KeyedMutator<IActivity[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      activityName: item.activityName,
    },
  });

  async function deleteItem() {
    const updated = await deleteActivityItem(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Delete additional activity"
      >
        You are going to delete additional activity: <b>{item.activityName}</b>.
        <Space h={"lg"}></Space> Are you sure about that?
        <Space h={"lg"}></Space>
        <Button color="red" leftIcon={<IconTrash />} onClick={deleteItem}>
          Delete {item.activityName}
        </Button>
      </Modal>
    </>
  );
}

export default DeleteModal;
