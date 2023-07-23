import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {Realm} from '@realm/react';

import Navigation from './src/navigation/Navigation';
import {theme} from './src/styles/theme';
import {RealmContext} from './src/models';
import GlobalContext from './src/context/context';

const App = () => {
  const {RealmProvider} = RealmContext;
  const [userId, setUserId] = useState<Realm.BSON.UUID | null>(null);

  const initialContext = {
    userId,
    setUserId,
  };
  return (
    <NativeBaseProvider theme={theme}>
      <GlobalContext.Provider value={initialContext}>
        <NavigationContainer>
          <RealmProvider>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Navigation />
          </RealmProvider>
        </NavigationContainer>
      </GlobalContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
