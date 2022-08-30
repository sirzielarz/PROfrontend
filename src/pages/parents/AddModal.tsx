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
import { createParent } from "../../api/parent/index";
import { IParent, APIParentPOST } from "../../interfaces/Entities";
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
  mutate: KeyedMutator<IParent[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm<APIParentPOST>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      identityDocumentNumber: "",
      bankAccountNumber: "",
      phoneNumber: "",
      address: {
        city: "",
        street: "",
        buildingNumber: "",
        flatNumber: "",
        zipCode: "",
        isWorkAddress: false,
      },

      // isAdmin: false,
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
      password: (value) =>
        value.length < 4
          ? "enter at least 4 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,

      confirmPassword: (value: string, values: APIParentPOST) =>
        value !== values.password
          ? "passwords did not match"
          : value.length < 4
          ? "enter at least 4 characters"
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

  async function createItem(values: APIParentPOST) {
    const updated = await createParent(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create parent">
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
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                required
                placeholder="enter password"
                label="Password"
                mb="sm"
                {...form.getInputProps("password")}
              />

              <PasswordInput
                required
                placeholder="confirm password"
                label="Confirm password"
                mb="sm"
                {...form.getInputProps("confirmPassword")}
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
                label="Bank account number"
                placeholder="bank account number"
                {...form.getInputProps("bankAccountNumber")}
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
              <Checkbox
                mt="md"
                label="Is work Address ?"
                {...form.getInputProps("address.isWorkAddress", {
                  type: "checkbox",
                })}
              />
            </Grid.Col>
          </Grid>
          <Space h="lg" />
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Create parent
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
