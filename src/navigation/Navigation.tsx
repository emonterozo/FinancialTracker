import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Home, Expenses, Goals, Subscriptions, Debt} from '../container';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Debt />
    </NavigationContainer>
  );
};

export default Navigation;
