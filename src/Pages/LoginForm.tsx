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
import useAuth from "../apix/useAuth";
import React, { useState } from "react";
import { showNotification } from "@mantine/notifications";

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
        val.length <= 3
          ? "Password should include at least 3 characters"
          : null,
    },
  });

  return (
    <Container>
      <Paper radius="md" p="xl" {...props}>
        <Title order={1}>Login to app:</Title>
        <Space h="lg" />
        <form onSubmit={form.onSubmit((values) => handleSubmit())}>
          <Stack>
            <TextInput
              required
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
                "Password should include at least 3 characters"
              }
            />
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
export default LoginForm;
