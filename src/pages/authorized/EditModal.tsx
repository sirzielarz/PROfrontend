import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Grid,
  Modal,
  PasswordInput,
  Popover,
  Space,
  TextInput,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { editAuthorizedPerson } from "../../api/authorized-person/index";
import {
  APIAuthorizedPerson,
  IAuthorizedPerson,
} from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";

function EditModal({
  item,
  mutate,
  handleClose,
}: {
  item: IAuthorizedPerson;
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm<APIAuthorizedPerson>({
    initialValues: {
      name: item.name,
      surname: item.surname,
      identityDocumentNumber: item.identityDocumentNumber,
      phoneNumber: item.phoneNumber,
      relationship: item.relationship,
    },
    validate: {
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
      phoneNumber: (value) =>
        value.length < 9
          ? "enter at least 9 characters"
          : value.length > 15
          ? "enter max 15 characters"
          : null,
    },
  });

  async function editItem(values: APIAuthorizedPerson) {
    const updated = await editAuthorizedPerson(item.id, values);
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
        title="Edit authorized person data"
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
            label="Identity document number"
            placeholder="identity document number"
            {...form.getInputProps("identityDocumentNumber")}
          />
          <TextInput
            required
            mb={12}
            label="Phone number"
            placeholder="phone number"
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            mb={12}
            label="Relationship"
            placeholder="relationship"
            {...form.getInputProps("relationship")}
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
