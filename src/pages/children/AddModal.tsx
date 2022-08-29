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
import { createChild } from "../../api/child/index";
import { IChild, APIChild } from "../../interfaces/Entities";
import { IconCirclePlus } from "@tabler/icons";
import { validatePesel } from "../../helpers/utils";

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
  mutate: KeyedMutator<IChild[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm<APIChild>({
    initialValues: {
      name: "",
      surname: "",
      pesel: "",
      address: {
        city: "",
        street: "",
        buildingNumber: "",
        flatNumber: "",
        zipCode: "",
      },
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
      pesel: (value) =>
        value.length != 11
          ? "pesel must have 11 characters"
          : !/^\d+$/.test(value)
          ? "pesel should contain only digits"
          : !validatePesel(value)
          ? "pesel is invalid"
          : null,
    },
  });

  async function createItem(values: APIChild) {
    const updated = await createChild(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create child">
        <form onSubmit={form.onSubmit(createItem)}>
          <Grid>
            <Grid.Col span={6}>
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
                label="Pesel"
                placeholder="pesel"
                {...form.getInputProps("pesel")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                required
                mb={12}
                label="City"
                placeholder="city"
                {...form.getInputProps("address.city")}
              />
              <TextInput
                mb={12}
                label="Street"
                placeholder="street"
                {...form.getInputProps("address.street")}
              />
              <TextInput
                required
                mb={12}
                label="Building number"
                placeholder="building number"
                {...form.getInputProps("address.buildingNumber")}
              />
              <TextInput
                mb={12}
                label="Flat number"
                placeholder="flat number"
                {...form.getInputProps("address.flatNumber")}
              />
              <TextInput
                mb={12}
                label="Zip code"
                placeholder="zip code"
                {...form.getInputProps("address.zipCode")}
              />
            </Grid.Col>
          </Grid>
          <Space h="lg" />
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Create child
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
