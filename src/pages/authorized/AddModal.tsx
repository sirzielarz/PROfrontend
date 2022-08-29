import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Grid,
  Modal,
  PasswordInput,
  Space,
  TextInput,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { createAuthorizedPerson } from "../../api/authorized-person/index";
import {
  IAuthorizedPerson,
  APIAuthorizedPerson,
} from "../../interfaces/Entities";
import { IconCirclePlus } from "@tabler/icons";

// interface FormValues {
//   name: string; // regular field, same as inferred type
//   role: "user" | "admin"; // union, more specific than inferred string type

//   // values that may be undefined or null
//   // cannot be correctly inferred in strict mode
//   age: number | undefined;
//   registeredAt: Date | null;

//   // Arrays that are empty cannot be inferred correctly
//   jobs: string[];
// }

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm<APIAuthorizedPerson>({
    initialValues: {
      name: "",
      surname: "",
      identityDocumentNumber: "",
      relationship: "",
      phoneNumber: "",
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

  async function createItem(values: APIAuthorizedPerson) {
    const updated = await createAuthorizedPerson(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create authorized person"
      >
        <form onSubmit={form.onSubmit(createItem)}>
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
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Create authorized person
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
