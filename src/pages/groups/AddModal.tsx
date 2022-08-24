import { useForm } from "@mantine/form";
import { Button, Modal, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { createGroup } from "../../api/group/index";
import { IGroup } from "../../interfaces/Entities";

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<IGroup[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm({
    initialValues: {
      groupName: "",
    },
  });

  async function createItem(values: { groupName: string }) {
    const updated = await createGroup(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create group">
        <form onSubmit={form.onSubmit(createItem)}>
          <TextInput
            required
            mb={12}
            label="Group name"
            placeholder="Enter group name"
            {...form.getInputProps("groupName")}
          />
          <Button type="submit">Create group</Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
