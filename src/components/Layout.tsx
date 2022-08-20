import React, { useState, useMemo } from "react";
import {
  AppShell,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import Logo from "./../logo.svg";
import { Route, Routes, Outlet } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import LoginForm from "../pages/LoginForm";
import useAuth from "../api/useAuth";
import LightDarkButton from "./LightDarkButton";
import NavbarComponent from "./NavbarComponent";
import GlobalContext from "../helpers/GlobalContext";
import MissingPathPage from "../pages/MissingPathPage";
import TeachersPage from "../pages/teachers/TeachersPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import ParentsPage from "../pages/parents/ParentsPage";
import GroupsPage from "../pages/groups/Page";
import HomePage from "../pages/HomePage";
import ChildrenPage from "../pages/children/ChildrenPage";

const AppShellComponent = () => {
  const { loaded } = useAuth();
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
          <Route path="/" element={<Outlet />}>
            {/*public routes*/}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route
              element={
                <RequireAuth allowedRoles={["teacher", "admin", "parent"]} />
              }
            >
              <Route path="/" element={<HomePage />} />
            </Route>

            {/*private routes*/}
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/groups" element={<GroupsPage />} />
            </Route>
            <Route
              element={<RequireAuth allowedRoles={["teacher", "admin"]} />}
            >
              <Route path="/parents" element={<ParentsPage />} />
              <Route path="/children" element={<ChildrenPage />} />
            </Route>
            {/*catch all other*/}
            <Route path="*" element={<MissingPathPage />} />
          </Route>
        </Routes>
      </AppShell>
    </GlobalContext.Provider>
  );
};

export default AppShellComponent;
