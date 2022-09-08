import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Space, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";
import {
  APIAuthorizedPerson,
  IAuthorizedPerson,
} from "../../interfaces/Entities";
import { IconArrowBack, IconEdit } from "@tabler/icons";

function DetailsModal({
  item,
  mutate,
  handleClose,
  handleEdit,
}: {
  item: IAuthorizedPerson;
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  handleClose: () => void;
  handleEdit: () => void;
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
      relationship: item.relationship,
      identityDocumentNumber: item.identityDocumentNumber,
      phoneNumber: item.phoneNumber,
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
        size={600}
        opened={open2}
        onClose={() => handleClose()}
        title="Authorized person details"
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
            required
            mb={12}
            label="Identity document number"
            placeholder="identity document number"
            {...form.getInputProps("identityDocumentNumber")}
          />
          <TextInput
            disabled
            required
            mb={12}
            label="Phone number"
            placeholder="phone number"
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            disabled
            mb={12}
            label="Relationship"
            placeholder="relationship"
            {...form.getInputProps("relationship")}
          />

          <Space h="lg" />
          <Button
            type="button"
            leftIcon={<IconEdit size={14} />}
            onClick={editDetailsItem}
            mr={"sm"}
          >
            Edit authorized person
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
