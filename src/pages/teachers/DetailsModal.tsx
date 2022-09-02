import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Modal, Space, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";

import { APITeacherPUT, ITeacher } from "../../interfaces/Entities";
import { IconArrowBack, IconEdit } from "@tabler/icons";

function DetailsModal({
  item,
  mutate,
  handleClose,
  handleEdit,
}: {
  item: ITeacher;
  mutate: KeyedMutator<ITeacher[]>;
  handleClose: () => void;
  handleEdit: () => void;
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

  function editDetailsItem() {
    handleEdit();
    handleClose();
  }

  function goBackToList() {
    handleClose();
  }
  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Teacher details"
      >
        <form>
          <TextInput
            disabled
            required
            mb={12}
            label="Name"
            placeholder="enter name"
            {...form.getInputProps("name")}
          />
          <TextInput
            disabled
            required
            mb={12}
            label="Surname"
            placeholder="enter surname"
            {...form.getInputProps("surname")}
          />
          <TextInput
            disabled
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <Checkbox
            disabled
            mt="md"
            label="User is administrator ?"
            {...form.getInputProps("isAdmin", { type: "checkbox" })}
          />
          <Space h="lg" />
          <Button
            type="button"
            leftIcon={<IconEdit size={14} />}
            onClick={editDetailsItem}
            mr={"sm"}
          >
            Edit teacher
          </Button>
          <Button
            type="button"
            leftIcon={<IconArrowBack size={14} />}
            onClick={goBackToList}
          >
            Go back to list
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default DetailsModal;
