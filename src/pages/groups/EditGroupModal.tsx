import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { createGroup, editGroupName } from "../../api/index";
import { GroupDTO } from "../../interfaces/Entities";

function EditGroupModal({
  group,
  mutate,
  handleClose,
}: {
  group: GroupDTO;
  mutate: KeyedMutator<GroupDTO[]>;
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

  async function editItem(values: { groupName: string }) {
    const updated = await editGroupName(group.id, values.groupName);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Edit group">
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

export default EditGroupModal;
