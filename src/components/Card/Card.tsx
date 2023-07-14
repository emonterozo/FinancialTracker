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

const Card = () => {
  return (
    <HStack
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      bgColor="#fafafa"
      p={3}
      space={3}
      borderRadius="lg"
      alignItems="center"
      justifyContent="space-between">
      <Avatar
        bg="indigo.500"
        source={{
          uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}>
        JB
      </Avatar>
      <VStack flex={1}>
        <Text
          bold
          color="black"
          fontSize="lg"
          letterSpacing="sm"
          numberOfLines={1}>
          Sample descriptionsd asd
        </Text>
        <Text
          color="warmGray.800"
          fontWeight="600"
          fontSize="md"
          letterSpacing="sm">
          Fri, 05 April 2022
        </Text>
      </VStack>
      <VStack alignItems="flex-end">
        <Text bold color="secondary.400" fontSize="md">
          PHP 952.00
        </Text>
      </VStack>
    </HStack>
  );
};

export default Card;
