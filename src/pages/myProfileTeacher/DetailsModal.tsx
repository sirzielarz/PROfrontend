import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Container, Space, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import { APITeacherPUTMyData, ITeacher } from "../../interfaces/Entities";
import { IconEdit, IconLock } from "@tabler/icons";

function DetailsModal({
  item,
  mutate,
  handleClose,
  handlePassword,
  handleEdit,
}: {
  item: ITeacher;
  mutate: KeyedMutator<ITeacher>;
  handleClose: () => void;
  handlePassword: () => void;
  handleEdit: () => void;
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

  function editDetailsItem() {
    handleEdit();
    handleClose();
  }

  function goBackToList() {
    handleClose();
  }

  return (
    <>
      <Container>
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
            required
            mb={12}
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <Space h="lg" />
          <Button
            type="button"
            leftIcon={<IconEdit size={14} />}
            onClick={editDetailsItem}
            mr={"sm"}
          >
            Edit data
          </Button>
          <Button
            type="button"
            leftIcon={<IconLock size={14} />}
            onClick={handlePassword}
          >
            Change password
          </Button>
        </form>
      </Container>
    </>
  );
}

export default DetailsModal;
