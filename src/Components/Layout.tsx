import React, { useState, useContext, useMemo } from "react";
import ReactDOM from "react-dom/client";
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Paper,
  Loader,
} from "@mantine/core";
import Logo from "./../logo.svg";
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";
import LoginForm from "../Pages/LoginForm";
import { useAuth } from "../api/use-auth";
import { getGroupTeacher } from "../api";
import LightDarkButton from "./LightDarkButton";
import NavbarComponent from "./NavbarComponent";
import GlobalContext from "../Helpers/GlobalContext";
import MissingPathPage from "../Pages/MissingPathPage";

// import LoginPage from "../Pages/LoginPage";
// import TeachersPage from "../Pages/TeachersPage";

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
  const [opened, setOpened] = useState<boolean>(false);
  const providerOpened = useMemo(
    () => ({ opened, setOpened }),
    [opened, setOpened]
  );

  if (!loaded) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }

  // console.log(user);

  return (
    <GlobalContext.Provider value={providerOpened}>
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
          <NavbarComponent
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          />
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
                />
              </MediaQuery>
              <img src={Logo} alt="Logo" />
              <LightDarkButton />
            </div>
          </Header>
        }
      >
        <Routes>
          <Route path="/" element={<Outlet />} />
          {/*public routes*/}
          <Route path="/login" element={<LoginForm />} />
          {/*private routes*/}

          {/*catch all other*/}
          <Route path="*" element={<MissingPathPage />} />
        </Routes>

        {/* {user ? <GroupTeachers /> : <LoginForm />} */}
      </AppShell>
    </GlobalContext.Provider>
  );
};

export default AppShellComponent;
