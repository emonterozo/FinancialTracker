import React from 'react';
import {HStack, IconButton} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigation = () => {
  return (
    <HStack
      p={8}
      alignItems="center"
      justifyContent="space-between"
      position="absolute"
      left={0}
      right={0}
      bottom={0}>
      <IconButton
        size="lg"
        _icon={{
          as: MaterialCommunityIcons,
          name: 'home',
          color: 'primary.400',
        }}
      />
      <IconButton
        size="lg"
        _icon={{
          as: MaterialCommunityIcons,
          name: 'bullseye-arrow',
          color: 'warmGray.500',
        }}
      />
      <IconButton
        size="lg"
        bgColor="primary.400"
        borderRadius="full"
        _icon={{
          as: MaterialCommunityIcons,
          name: 'plus',
          color: 'white',
        }}
      />
      <IconButton
        size="lg"
        _icon={{
          as: MaterialCommunityIcons,
          name: 'credit-card-outline',
          color: 'warmGray.500',
        }}
      />
      <IconButton
        size="lg"
        _icon={{
          as: MaterialCommunityIcons,
          name: 'cash',
          color: 'warmGray.500',
        }}
      />
    </HStack>
  );
};

export default BottomNavigation;
