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

const Expenses = () => {
  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Expenses" />
      <VStack flex={1} space={5} mt={10}>
        <Box w="100%" px={5}>
          <HStack justifyContent="space-between" space={3} alignItems="center">
            <Box flex={1} bgColor="secondary.400" borderRadius="2xl" p={5}>
              <Text fontSize="md" fontWeight="600" color="white">
                Total Income
              </Text>
              <Heading mt={1} color="white">
                P30,300.00
              </Heading>
            </Box>
            <Box flex={1} bgColor="primary.400" borderRadius="2xl" p={5}>
              <Text fontSize="md" fontWeight="600" color="white">
                Total Expense
              </Text>
              <Heading mt={1} color="white">
                P30,300.00
              </Heading>
            </Box>
          </HStack>
        </Box>
        <VStack space={3} flex={1} p={5}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="md">Expenses</Heading>
            <HStack
              bgColor="primary.400"
              px="3"
              py="1"
              borderRadius="md"
              space="2"
              alignItems="center">
              <Text fontSize="sm" fontWeight="600" color="white">
                July 2022
              </Text>
              <ChevronDownIcon size="sm" color="white" />
            </HStack>
          </HStack>
          {[1, 2, 3, 4, 5].map(item => (
            <Card />
          ))}
        </VStack>
        <BottomNavigation />
      </VStack>
    </Box>
  );
};

export default Expenses;
