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
import { resetTeacherPassword } from "../../api/teacher/index";
import {
  ITeacher,
  APITeacherPOST,
  ResetPassword,
  APIResetPassword,
} from "../../interfaces/Entities";

import { useLayoutEffect, useState } from "react";

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

function ResetPasswordModal({
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
  const form = useForm<ResetPassword>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 4
          ? "enter at least 4 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,

      confirmPassword: (value: string, values: ResetPassword) =>
        value !== values.password
          ? "passwords did not match"
          : value.length < 4
          ? "enter at least 4 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
    },
  });

  async function resetPassword(values: ResetPassword) {
    const updated = await resetTeacherPassword(item.id, values.password);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Reset teacher's password"
      >
        <form onSubmit={form.onSubmit(resetPassword)}>
          <PasswordInput
            required
            placeholder="enter new password"
            label="Password"
            mb="sm"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            required
            placeholder="confirm new password"
            label="Confirm password"
            mb="sm"
            {...form.getInputProps("confirmPassword")}
          />
          <Space h="lg" />

          <Button type="submit">Set password</Button>
        </form>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
