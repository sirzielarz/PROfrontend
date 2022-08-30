import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  PaperProps,
  Button,
  Stack,
  Container,
  Title,
  Space,
} from "@mantine/core";
import useAuth from "../api/useAuth";
import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { IconLogin } from "@tabler/icons";

const LoginForm = (props: PaperProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showUnsuccessfullLogin = () => {
    showNotification({
      id: "errorNotification",
      disallowClose: false,
      onClose: () => form.clearErrors(),
      title: "Login failed",
      message: "Please check data you submitted",
      color: "red",
      className: "my-notification-class",
      loading: false,
    });
  };
  const showSuccessfullLogin = () => {
    showNotification({
      id: "loginNotification",
      disallowClose: false,
      onClose: () => form.clearErrors(),
      title: "Login succeed",
      message: "",
      color: "green",
      className: "my-notification-class",
      loading: false,
    });
  };

  const handleSubmit = () => {
    signin(email, password)
      .then((response) => {
        console.log("successLoginForm", response);
        showSuccessfullLogin();
      })
      .catch((error) => {
        console.log("errorLoginForm", error);
        showUnsuccessfullLogin();
      });
  };

  const { signin } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 4 ? "Password should include at least 4 characters" : null,
    },
  });

  return (
    <Container>
      <Paper radius="md" p="xl">
        <Title order={1}>Login to app:</Title>
        <Space h="lg" />
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <Stack>
            <TextInput
              {...form.getInputProps("email")}
              required={true}
              label="Email"
              placeholder="your@email.com"
              value={form.values.email}
              onChange={(event) => {
                form.setFieldValue("email", event.currentTarget.value);
                setEmail(event.currentTarget.value);
              }}
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              {...form.getInputProps("password")}
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => {
                form.setFieldValue("password", event.currentTarget.value);
                setPassword(event.currentTarget.value);
              }}
              error={
                form.errors.password &&
                "Password should include at least 4 characters"
              }
            />
            <Button type="submit" leftIcon={<IconLogin />}>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
export default LoginForm;
