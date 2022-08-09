import React from "react";
import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Paper,
  Loader,
} from "@mantine/core";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import LoginPage from "../Pages/LoginPage";
import LoginForm from "../Pages/LoginForm";
import TeachersPage from "../Pages/TeachersPage";
import { useAuth } from "./../api/use-auth";
import { getGroupTeacher } from "./../api";
import LightDarkButton from "./LightDarkButton";

function GroupTeachers() {
  const [groupTeachers, setGroupTeachers] = useState(null);

  const handleButtonClick = () => {
    getGroupTeacher()
      .then((teachers) => {
        setGroupTeachers(teachers);
        console.log("---teachers---", teachers);
      })
      .catch((error) => {
        // errors
        console.log("---error---", error);
      });
  };

  if (!groupTeachers) {
    return <Button onClick={handleButtonClick}>Get group teachers</Button>;
  }

  return <div>{JSON.stringify(groupTeachers)}</div>;
}

const AppShellComponent = () => {
  const { user, loaded } = useAuth();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (!loaded) {
    return (
      <>
        <Loader></Loader>
        <p>Loading...</p>
      </>
    );
  }

  console.log(user);

  return (
    <AppShell
      styles={
        {
          // main: {
          //   background:
          //     theme.colorScheme === "dark"
          //       ? theme.colors.dark[8]
          //       : theme.colors.gray[0],
          // },
        }
      }
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application menu</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
            <LightDarkButton />
          </div>
        </Header>
      }
    >
      <Text variant="text">Resize app to see responsive navbar in action</Text>

      <Paper>{user ? <GroupTeachers /> : <LoginForm />}</Paper>
    </AppShell>
  );
};

export default AppShellComponent;
