import 'react-native-gesture-handler';
import React from 'react';
import {Heading, HStack, Avatar} from 'native-base';

interface IAppHeader {
  label: string;
}

const AppHeader = ({label}: IAppHeader) => {
  return (
    <HStack justifyContent="center" alignItems="center" p={5}>
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
