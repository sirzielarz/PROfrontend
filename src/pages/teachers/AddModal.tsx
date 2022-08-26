import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Modal,
  PasswordInput,
  Space,
  TextInput,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { createTeacher } from "../../api/teacher/index";
import { ITeacher, APITeacherPOST } from "../../interfaces/Entities";

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
  mutate: KeyedMutator<ITeacher[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm<APITeacherPOST>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      isAdmin: false,
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      // fname: (value) =>
      //   value.length < 2 ? "Name must have at least 2 letters" : null,
      // lname: (value) =>
      //   value.length < 2 ? "Name must have at least 2 letters" : null,
      // confirmPassword: (value: string, values: string) =>
      //   value !== values.password ? "Passwords did not match" : null,
    },
  });

  async function createItem(values: APITeacherPOST) {
    const updated = await createTeacher(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create teacher"
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
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            // required
            placeholder="Your password"
            //icon={<Lock size={16} />}
            radius="xs"
            mt="sm"
            size="lg"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            // required
            placeholder="Confirm password"
            //icon={<Lock size={16} />}
            radius="xs"
            mt="sm"
            size="lg"
            {...form.getInputProps("confirmPassword")}
          />

          <Checkbox
            mt="md"
            label="User is administrator ?"
            {...form.getInputProps("isAdmin", { type: "checkbox" })}
          />
          <Space h="lg" />

          <Button type="submit">Create teacher</Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
