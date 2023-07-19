import React from 'react';
import {Text, Icon, VStack, HStack, Avatar} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {globalStyle} from '../../styles/styles';

interface ICard {
  icon: string;
  description: string;
  date: string;
  amount: string;
  handlePress?: () => void;
}

const Card = ({icon, description, date, amount, handlePress}: ICard) => {
  return (
    <HStack
      style={globalStyle.card}
      bgColor="#fafafa"
      p={3}
      mx={2}
      my={1}
      space={3}
      borderRadius="lg"
      alignItems="center"
      justifyContent="space-between">
      <Avatar bg="tertiary.400">
        <Icon as={MaterialCommunityIcons} name={icon} size="xl" color="white" />
      </Avatar>
      <VStack flex={1}>
        <Text
          bold
          color="black"
          fontSize="lg"
          letterSpacing="sm"
          numberOfLines={1}>
          {description}
        </Text>
        <Text
          color="warmGray.800"
          fontWeight="600"
          fontSize="md"
          letterSpacing="sm">
          {date}
        </Text>
      </VStack>
      <VStack alignItems="flex-end">
        <Text bold color="secondary.400" fontSize="md">
          {`₱${amount}`}
        </Text>
      </VStack>
    </HStack>
  );
};

export default Card;
