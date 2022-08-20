import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { editActivityName } from "../../api/index";
import { IActivity } from "../../interfaces/Entities";

function EditModal({
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

  async function editItem(values: { activityName: string }) {
    const updated = await editActivityName(item.id, values.activityName);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Edit activity">
        <form onSubmit={form.onSubmit(editItem)}>
          <TextInput
            required
            mb={12}
            label="Activity name"
            placeholder="Enter activity name"
            {...form.getInputProps("activityName")}
          />
          <Button type="submit">Edit activity</Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
