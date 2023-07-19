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

const Goals = () => {
  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Goals" />
      <VStack flex={1} space={5} mt={10} p={5}>
        <VStack
          w="65%"
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
          space={2}
          borderRadius="lg"
          alignItems="flex-start"
          justifyContent="space-between">
          <Avatar
            size="lg"
            bg="indigo.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}>
            JB
          </Avatar>
          <VStack>
            <Text
              bold
              color="black"
              fontSize="lg"
              letterSpacing="sm"
              numberOfLines={1}>
              Buy Car
            </Text>
            <Text
              color="warmGray.500"
              fontWeight="600"
              fontSize="md"
              letterSpacing="sm">
              05 April 2022
            </Text>
          </VStack>
          <HStack alignItems="center" space={1}>
            <Text bold color="secondary.400" fontSize="sm">
              ₱952.00
            </Text>
            <Text bold color="warmGray.500" fontSize="sm">
              of ₱952.00
            </Text>
          </HStack>
        </VStack>
        <HStack alignItems="center" justifyContent="space-between">
          <Heading size="md">Last Transactions</Heading>
        </HStack>
        <VStack space={2}>
          <Card icon="piggy-bank-outline" />
          <Card icon="piggy-bank-outline" />
          <Card icon="piggy-bank-outline" />
        </VStack>
      </VStack>
      <BottomNavigation />
    </Box>
  );
};

export default Goals;
