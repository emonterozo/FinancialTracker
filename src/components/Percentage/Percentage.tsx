import React from 'react';
import {Box, Icon, Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IPercentage {
  percent: string;
  fillColor: string;
  backgroundColor: string;
  borderColor: string;
}

const Percentage = ({
  percent,
  fillColor,
  backgroundColor,
  borderColor,
}: IPercentage) => {
  return (
    <Box
      height="25"
      width="85%"
      borderColor={borderColor}
      borderWidth={1}
      borderRadius="full"
      bgColor={backgroundColor}>
      <Box
        height="23"
        width={percent}
        borderLeftRadius="full"
        borderRightRadius="full"
        bgColor={fillColor}
        alignItems="center"
        justifyContent="center">
        <Text fontSize="xs" color="white">
          {percent}
        </Text>
        <Icon
          as={MaterialCommunityIcons}
          name="star"
          size={50}
          color="yellow.400"
          position="absolute"
          right={-22}
        />
      </Box>
    </Box>
  );
};

export default Percentage;
