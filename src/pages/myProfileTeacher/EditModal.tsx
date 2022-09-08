import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Grid, Modal, Space, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { editTeacher, updateMyDataTeacher } from "../../api/teacher/index";
import {
  APITeacherPUT,
  APITeacherPUTMyData,
  ITeacher,
} from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";

function EditModal({
  item,
  mutate,
  handleClose,
}: {
  item: ITeacher;
  mutate: KeyedMutator<ITeacher>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm<APITeacherPUTMyData>({
    initialValues: {
      name: item.name,
      surname: item.surname,
      email: item.email,
    },
    validate: {
      email: (value: string) =>
        value.length < 5
          ? "enter at least 5 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : /^\S+@\S+$/.test(value)
          ? null
          : "invalid email",
      name: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
      surname: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
    },
  });

  async function editItem(values: APITeacherPUTMyData) {
    const updated = await updateMyDataTeacher(values);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        size={600}
        opened={open2}
        onClose={() => handleClose()}
        title="Edit data"
      >
        <form onSubmit={form.onSubmit(editItem)}>
          <TextInput
            required
            mb={12}
            label="Name"
            placeholder="enter name"
            {...form.getInputProps("name")}
          />

          <TextInput
            required
            mb={12}
            label="Surname"
            placeholder="enter surname"
            {...form.getInputProps("surname")}
          />

          <TextInput
            required
            mb={12}
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <Space h="lg" />
          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Save data
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
