import React, { useState, useEffect } from "react";

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Paper,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Cards from "./Components/Cards";
import LightDarkButton from "./Components/LightDarkButton";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: "admin@admin.com",
        password: "admin",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("-------error------:", error));
  }, []);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
          <Paper>
            <LightDarkButton />
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
