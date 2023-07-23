import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {isEmpty} from 'lodash';
import LottieSplashScreen from 'react-native-lottie-splash-screen';

import {Home, Expenses, Goals, Subscriptions, Debt} from '../container';
import {RealmContext} from '../models';
import {StackParamList} from '../types/navigation/types';
import {Account} from '../models/Account';
import GlobalContext from '../context/context';
const {useRealm} = RealmContext;

const Stack = createStackNavigator<StackParamList>();

const Navigation = () => {
  const realm = useRealm();
  const {setUserId} = useContext(GlobalContext);

  useEffect(() => {
    const data = realm.objects(Account);
    if (isEmpty(data)) {
      const user = {
        _id: new Realm.BSON.UUID(),
        amount: 0,
      };
      realm.write(() => {
        realm.create('Account', user);
      });
      setUserId(user._id);
    } else {
      setUserId(data[0]._id);
    }
    setTimeout(() => {
      LottieSplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="Goals" component={Goals} />
      <Stack.Screen name="Subscriptions" component={Subscriptions} />
      <Stack.Screen name="Debt" component={Debt} />
    </Stack.Navigator>
  );
};

export default Navigation;
