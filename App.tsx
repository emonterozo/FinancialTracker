import 'react-native-gesture-handler';
import React from 'react';
import {NativeBaseProvider} from 'native-base';

import Navigation from './src/navigation/Navigation';
import {theme} from './src/styles/theme';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
    </NativeBaseProvider>
  );
};

export default App;
