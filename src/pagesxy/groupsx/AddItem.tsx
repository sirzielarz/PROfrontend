import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { fetcher } from "../../api/fetch";
import { IGroup } from "./GroupsPage";
import { createGroup } from "../../api/index";

function AddItem({ mutate }: { mutate: KeyedMutator<IGroup[]> }) {
  const [open, setOpen] = useState(false);

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
          {/* <Textarea
            required
            mb={12}
            label="Body"
            placeholder="desc....."
            {...form.getInputProps("body")}
          /> */}

          <Button type="submit">Create group</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add group
        </Button>
      </Group>
    </>
  );
}

export default AddItem;
