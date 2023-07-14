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
  FlatList,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Card, AppHeader, BottomNavigation} from '../../components';

const Subscriptions = () => {
  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Subscriptions" />
      <VStack flex={1} space={5} mt={10} p={5}>
        <Box flex={1} bgColor="white" justifyContent="center">
          <FlatList
            data={[1, 2, 3]}
            renderItem={() => (
              <VStack
                w="46%"
                m="2%"
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
                borderRadius="lg">
                <Avatar
                  alignSelf="center"
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
                    Converge Internet
                  </Text>
                  <Text bold color="secondary.400" fontSize="sm">
                    PHP 952.00
                  </Text>
                </VStack>
              </VStack>
            )}
            numColumns={2}
          />
        </Box>
      </VStack>
      <BottomNavigation />
    </Box>
  );
};

export default Subscriptions;
