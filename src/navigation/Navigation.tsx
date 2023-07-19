import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Expenses, Goals, Subscriptions, Debt} from '../container';
import {RealmContext} from '../models';
import {StackParamList} from '../types/navigation/types';

const Stack = createStackNavigator<StackParamList>();

const Navigation = () => {
  const {RealmProvider} = RealmContext;
  return (
    <NavigationContainer>
      <RealmProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Expenses" component={Expenses} />
          <Stack.Screen name="Goals" component={Goals} />
          <Stack.Screen name="Subscriptions" component={Subscriptions} />
          <Stack.Screen name="Debt" component={Debt} />
        </Stack.Navigator>
      </RealmProvider>
    </NavigationContainer>
  );
};

export default Navigation;
