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
import {AppHeader, BottomNavigation, Card} from '../../components';

const barData = [
  {
    value: 250,
    label: 'Jan',
    labelTextStyle: {color: '#616566', textAlign: 'center'},
    topLabelComponent: () => (
      <Text fontSize="xs" bold color="#616566">
        P250
      </Text>
    ),
  },
  {
    value: 500,
    label: 'Feb',
    labelTextStyle: {color: '#616566', textAlign: 'center'},
    topLabelComponent: () => (
      <Text fontSize="xs" bold color="#616566">
        P500
      </Text>
    ),
  },
  {
    value: 745,
    label: 'Mar',
    frontColor: '#8032f9',
    labelTextStyle: {color: '#8032f9', textAlign: 'center'},
    topLabelComponent: () => (
      <Text fontSize="xs" bold color="#616566">
        P745
      </Text>
    ),
  },
  {
    value: 320,
    label: 'Apr',
    labelTextStyle: {color: '#616566', textAlign: 'center'},
    topLabelComponent: () => (
      <Text fontSize="xs" bold color="#616566">
        P320
      </Text>
    ),
  },
  {
    value: 600,
    label: 'May',
    labelTextStyle: {color: '#616566', textAlign: 'center'},
    topLabelComponent: () => (
      <Text fontSize="xs" bold color="#616566">
        P600
      </Text>
    ),
  },
  {
    value: 256,
    label: 'June',
    labelTextStyle: {color: '#616566', textAlign: 'center'},
    topLabelComponent: () => (
      <Text fontSize="xs" bold color="#616566">
        P256
      </Text>
    ),
  },
];

const Home = () => {
  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Home" />
      <Box h="30%" p={5} justifyContent="center">
        <VStack space={3}>
          <Box bgColor="tertiary.400" p={8} borderRadius="2xl">
            <Text fontSize="md" fontWeight="900" color="#616566">
              Total Balance
            </Text>
            <Heading mt={1} color="white">
              PHP 30,300.00
            </Heading>
            <Box mt="5">
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{borderRadius: 20}}
                colors={['#ff653a', '#ffa288', '#d5d8dd']}>
                <Box h="1.5" bgColor="transparent" borderRadius="full" />
              </LinearGradient>
            </Box>
          </Box>
        </VStack>
      </Box>
      <VStack space={3} justifyContent="center">
        <HStack px={5} alignItems="center" justifyContent="space-between">
          <Heading size="md">Analytics</Heading>
          <HStack
            bgColor="primary.400"
            px="3"
            py="1"
            borderRadius="md"
            space="2"
            alignItems="center">
            <Text fontSize="sm" fontWeight="600" color="white">
              Year - 2022
            </Text>
            <ChevronDownIcon size="sm" color="white" />
          </HStack>
        </HStack>
        <Box mr={10}>
          <BarChart
            barWidth={45}
            barBorderRadius={5}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText={true}
            yAxisLabelWidth={0}
            dashGap={2}
            hideRules
          />
        </Box>
      </VStack>
      <VStack space={3} flex={1} p={5}>
        <HStack alignItems="center" justifyContent="space-between">
          <Heading size="md">Expenses</Heading>
          <Text fontSize="sm" fontWeight="600" color="warmGray.700">
            View All
          </Text>
        </HStack>
        <Card />
      </VStack>
      <BottomNavigation />
    </Box>
  );
};

export default Home;
