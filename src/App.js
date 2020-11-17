import React from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import WalkingManager from './components/WalkingManager/WalkingManager';
import { theme } from './styles';

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
