import React from "react";
import Header from "./components/Header/Header";
import { ThemeProvider } from "styled-components";
import Section from "./components/Section/Section";
import WalkingManager from "./components/WalkingManager/WalkingManager";

const theme = {
  main: "#1C2025",
  accent: "#EC174F",
  accentHover: "#d4295b",
  gray: "#EFEFF0",
  white: "#FFFFFF",
  sans: "PT Sans, sans-serif",
  sansCaption: "PT Sans Caption, sans-serif",
  defaultTransition: "0.2s ease",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header title="Шагомер на тестовое задание" />
      <Section row>
        <WalkingManager />
      </Section>
    </ThemeProvider>
  );
}

export default App;
