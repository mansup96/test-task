import React from "react";
import Header from "./components/Header/Header";
import { ThemeProvider } from "styled-components";
import Section from "./components/Section/Section";
import Button from "./components/Button/Button";

const theme = {
  main: "#1C2025",
  accent: "#EC174F",
  accentHover: "#d4295b",
  gray: "#EFEFF0",
  white: "#FFFFFF",
  sans: "PT Sans, sans-serif",
  sansCaption: "PT Sans Caption, sans-serif",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header title="Шагомер на тестовое задание" />
      <Section>
        <Button/>
      </Section>
    </ThemeProvider>
  );
}

export default App;
