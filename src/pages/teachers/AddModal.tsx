import { useForm } from "@mantine/form";
import { Button, Modal, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { createActivity } from "../../api/additional-activity/index";
import { ITeacher } from "../../interfaces/Entities";

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<ITeacher[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm({
    initialValues: {
      activityName: "",
    },
  });

  async function createItem(values: { activityName: string }) {
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
        title="Create teacher"
      >
        <form onSubmit={form.onSubmit(createItem)}>
          <TextInput
            required
            mb={12}
            label="Name"
            placeholder="enter name"
            {...form.getInputProps("name")}
          />
          <Button type="submit">Create teacher</Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
