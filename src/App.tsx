import React from 'react';

import AppLoading from 'expo-app-loading';

import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';

import { Home } from './pages/Home';
import { CarDetails } from './pages/CarDetails';
import { Scheduling } from './pages/Scheduling';
import { SchedulingDetails } from './pages/SchedulingDetails';
import { SchedulingComplete } from './pages/SchedulingComplete';

import { ThemeProvider } from 'styled-components/native';
import theme from './styles/theme';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_500Medium, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <SchedulingComplete />
    </ThemeProvider>
  );
}