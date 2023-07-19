import React from 'react';
import {Box, VStack, Heading, Image} from 'native-base';

import {NO_DATA} from '../../config/assets';

interface IEmptyData {
  header?: string;
  message?: string;
  isFilter?: boolean;
  isSearchOnly?: boolean;
}

const EmptyData = ({header, message, isFilter, isSearchOnly}: IEmptyData) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <VStack space={2} alignItems="center" justifyContent="center">
        <Image
          height={200}
          source={NO_DATA}
          alt="error image"
          resizeMode="cover"
        />
        <VStack space={1} width="90%" alignItems="center">
          <Heading fontSize="xl" textAlign="center" color="gray.400">
            {header
              ? header
              : isFilter
              ? 'No results found'
              : 'No available data to display'}
          </Heading>
          {(message || isFilter) && (
            <Heading fontSize="lg" color="gray.400" textAlign="center">
              {message ||
                `We couldn't find what you looking for. Try searching again${
                  isSearchOnly ? '.' : ' or adjusting your filter.'
                }`}
            </Heading>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default EmptyData;
