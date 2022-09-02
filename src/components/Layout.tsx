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
import TeachersPage from "../pages/teachers/Page";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import ParentsPage from "../pages/parents/Page";
import GroupsPage from "../pages/groups/Page";
import HomePage from "../pages/HomePage";
import ChildrenPage from "../pages/children/Page";
import ActivitiesPage from "../pages/additionalActivities/Page";
import AuthorizedPage from "../pages/authorized/Page";
import AnnouncementsPage from "../pages/announcements/Page";
import PresencePage from "../pages/presence/Page";
import PhotoAlbumsPage from "../pages/photoAlbums/Page";

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
          <Route path="/" key={"outlet"} element={<Outlet />}>
            {/*public routes*/}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

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
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/authorized" element={<AuthorizedPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={["teacher", "admin", "parent"]} />
              }
            >
              <Route path="/" key={"home"} element={<HomePage />} />
              <Route path="/presence" element={<PresencePage />} />
              <Route path="/photo-albums" element={<PhotoAlbumsPage />} />
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
