import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import Header from './components/Header/Header';
import Section from './components/common/Section/Section';
import WalkingManager from './components/WalkingManager/WalkingManager';
import { theme } from './styles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header title="Шагомер на тестовое задание" />
      <Section row>
        <WalkingManager />
      </Section>
    </ThemeProvider>
  );
};

export default App;
