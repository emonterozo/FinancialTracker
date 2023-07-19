import React from 'react';
import {HStack, IconButton} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEqual} from 'lodash';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {StackParamList} from '../../types/navigation/types';

type NavigationProps = NavigationProp<StackParamList>;

interface IBottomNavigation {
  activeId: 1 | 2 | 3 | 4 | 5;
  handlePressAdd: () => void;
}

const ACTIONS = [
  {
    id: 1,
    icon: 'home',
    screen: 'Home',
  },
  {
    id: 2,
    icon: 'credit-card-outline',
    screen: 'Subscriptions',
  },
  {
    id: 3,
    icon: 'plus',
    screen: '',
  },

  {
    id: 4,
    icon: 'bullseye-arrow',
    screen: 'Goals',
  },
  {
    id: 5,
    icon: 'account-multiple',
    screen: 'Debt',
  },
];

const BottomNavigation = ({activeId, handlePressAdd}: IBottomNavigation) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <HStack p={8} alignItems="center" justifyContent="space-between">
      {ACTIONS.map(item => {
        if (isEqual(item.id, 3)) {
          return (
            <IconButton
              key={item.id}
              onPress={handlePressAdd}
              size="lg"
              bgColor="primary.400"
              borderRadius="full"
              _pressed={{bgColor: 'primary.600'}}
              _icon={{
                as: MaterialCommunityIcons,
                name: 'plus',
                color: 'white',
              }}
            />
          );
        } else {
          return (
            <IconButton
              key={item.id}
              onPress={() => navigation.navigate(item.screen)}
              size="lg"
              _icon={{
                as: MaterialCommunityIcons,
                name: item.icon,
                color: isEqual(item.id, activeId)
                  ? 'primary.400'
                  : 'warmGray.500',
              }}
            />
          );
        }
      })}
    </HStack>
  );
};

export default BottomNavigation;
