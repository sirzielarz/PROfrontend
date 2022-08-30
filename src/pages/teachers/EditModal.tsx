import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Modal,
  PasswordInput,
  Popover,
  Space,
  TextInput,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { editTeacher } from "../../api/teacher/index";
import { APITeacherPUT, ITeacher } from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";

function EditModal({
  item,
  mutate,
  handleClose,
}: {
  item: ITeacher;
  mutate: KeyedMutator<ITeacher[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm<APITeacherPUT>({
    initialValues: {
      name: item.name,
      surname: item.surname,
      email: item.email,
      isAdmin: item.isAdmin,
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

  async function editItem(values: APITeacherPUT) {
    const updated = await editTeacher(item.id, values);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit teacher data"
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
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <Checkbox
            mt="md"
            label="User is administrator ?"
            {...form.getInputProps("isAdmin", { type: "checkbox" })}
          />
          <Space h="lg" />
          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
