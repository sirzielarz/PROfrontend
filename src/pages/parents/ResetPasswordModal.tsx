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
import { resetParentPassword } from "../../api/parent/index";
import {
  IParent,
  APIParentPOST,
  ResetPassword,
  APIResetPassword,
} from "../../interfaces/Entities";

import { useLayoutEffect, useState } from "react";
import { IconDeviceFloppy } from "@tabler/icons";

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
  item: IParent;
  mutate: KeyedMutator<IParent[]>;
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
          ? "enter less than 50 characters"
          : null,
    },
  });

  async function resetPassword(values: ResetPassword) {
    const updated = await resetParentPassword(item.id, values.password);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Reset parent's password"
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

          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Set password
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
