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

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {BarChart} from 'react-native-gifted-charts';

interface IAppHeader {
  label: string;
}

const AppHeader = ({label}: IAppHeader) => {
  return (
    <HStack justifyContent="center" alignItems="center">
      <Avatar
        position="absolute"
        left={5}
        source={{
          uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}>
        JB
      </Avatar>
      <Heading size="lg">{label}</Heading>
    </HStack>
  );
};

export default AppHeader;
