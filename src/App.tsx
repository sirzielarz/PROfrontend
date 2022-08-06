import React, { useState, useEffect } from "react";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Paper,
  Button,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import LightDarkButton from "./Components/LightDarkButton";
import LoginPage from "./Components/LoginPage";
import { useAuth } from "./api/use-auth";
import { getGroupTeacher } from "./api";

function App() {
  const { user, loaded } = useAuth();

  // useEffect(() => {
  //   fetch("http://localhost:8080/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams({
  //       username: "admin@admin.com",
  //       password: "admin",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log("-------error------:", error));
  // }, []);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  if (!loaded) {
    return <p>Loading...</p>; //you can use spinner
  }

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Paper>{user ? <GroupTeachers /> : <LoginPage />}</Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

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

export default App;
