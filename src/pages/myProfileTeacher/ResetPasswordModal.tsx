import { useForm } from "@mantine/form";
import { Button, Modal, PasswordInput, Space } from "@mantine/core";
import { KeyedMutator } from "swr";
import { updateMyDataTeacherPassword } from "../../api/teacher/index";
import {
  ChangePassword,
  ChangePasswordAPI,
  ITeacher,
} from "../../interfaces/Entities";

import { useLayoutEffect, useState } from "react";
import { IconDeviceFloppy } from "@tabler/icons";

function ResetPasswordModal({
  item,
  mutate,
  handleClose,
}: {
  item: ITeacher;
  mutate: KeyedMutator<ITeacher>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);
  const form = useForm<ChangePassword>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      oldPassword: (value) =>
        value.length < 4
          ? "enter at least 4 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
      newPassword: (value) =>
        value.length < 4
          ? "enter at least 4 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,

      confirmPassword: (value: string, values: ChangePassword) =>
        value !== values.newPassword
          ? "passwords did not match"
          : value.length < 4
          ? "enter at least 4 characters"
          : value.length > 50
          ? "enter less than 50 characters"
          : null,
    },
  });

  async function resetPassword(values: ChangePassword) {
    const valuesToAPI: ChangePasswordAPI = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    await updateMyDataTeacherPassword(valuesToAPI)
      .then((response) => {
        console.log("success", response);
        mutate(response);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        form.reset();
        handleClose();
      });
    handleClose();
    // mutate(updated);
    // form.reset();
    // handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Change password"
      >
        <form onSubmit={form.onSubmit(resetPassword)}>
          <PasswordInput
            required
            placeholder="enter current password"
            label="Old password"
            mb="sm"
            {...form.getInputProps("oldPassword")}
          />

          <PasswordInput
            required
            placeholder="enter new password"
            label="New password"
            mb="sm"
            {...form.getInputProps("newPassword")}
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
            Change password
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default ResetPasswordModal;
