import { useForm } from "@mantine/form";
import { Button, Modal, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { createActivity } from "../../api/index";
import { IActivity } from "../../interfaces/Entities";

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<IActivity[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm({
    initialValues: {
      groupName: "",
    },
  });

  async function createItem(values: { groupName: string }) {
    const updated = await createActivity(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create additional activity"
      >
        <form onSubmit={form.onSubmit(createItem)}>
          <TextInput
            required
            mb={12}
            label="Activity name"
            placeholder="Enter activity name"
            {...form.getInputProps("activityName")}
          />
          <Button type="submit">Create activity</Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
