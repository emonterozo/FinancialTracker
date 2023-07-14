import 'react-native-gesture-handler';
import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  Icon,
  Heading,
  Stack,
  VStack,
  HStack,
  Button,
  ChevronDownIcon,
  Avatar,
  IconButton,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Card, AppHeader, BottomNavigation} from '../../components';

const Debt = () => {
  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Sample" />
      <VStack flex={1} space={5} mt={10}>
        <VStack space={3} flex={1} p={5}>
          <Card />
          <Card />
          <Card />
        </VStack>
        <BottomNavigation />
      </VStack>
    </Box>
  );
};

export default Debt;
