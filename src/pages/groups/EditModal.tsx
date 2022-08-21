import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { editGroupName } from "../../api/index";
import { IGroup } from "../../interfaces/Entities";

function EditModal({
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

  async function editItem(values: { groupName: string }) {
    const updated = await editGroupName(item.id, values.groupName);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit group name"
      >
        <form onSubmit={form.onSubmit(editItem)}>
          <TextInput
            required
            mb={12}
            label="Group name"
            placeholder="Enter group name"
            {...form.getInputProps("groupName")}
          />
          <Button type="submit">Edit group</Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
