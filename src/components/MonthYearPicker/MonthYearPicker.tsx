import React, {useState, Dispatch, SetStateAction} from 'react';
import {
  Text,
  Button,
  HStack,
  Icon,
  Modal,
  Pressable,
  VStack,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEqual, isEmpty} from 'lodash';

import {MONTHS_PICKER} from '../../utils/constant';

interface IMonthYearPicker {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  monthVal: string;
  yearVal: string;
  handleOnConfirm: (date: string) => void;
}

const MonthYearPicker = ({
  isOpen,
  setIsOpen,
  monthVal,
  yearVal,
  handleOnConfirm,
}: IMonthYearPicker) => {
  const [month, setMonth] = useState(monthVal);
  const [year, setYear] = useState(yearVal);
  const handlePressConfirm = () => {
    setIsOpen(false);
    handleOnConfirm(`${year}-${month}-01`);
  };

  const handlePress = (action: 'inc' | 'dec') => {
    const res = isEqual(action, 'inc')
      ? parseInt(year, 10) + 1
      : parseInt(year, 10) - 1;
    setYear(res.toString());
  };

  return (
    <Modal isOpen={isOpen} size="sm" onClose={() => setIsOpen(false)}>
      <Modal.Content borderRadius="3xl">
        <Modal.Body flex={1} bgColor="white">
          <VStack>
            <HStack justifyContent="space-between" px={1}>
              <Text bold fontSize="lg">
                {year}
              </Text>
              <HStack space={3} justifyContent="flex-end">
                <Pressable onPress={() => handlePress('dec')}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="chevron-left"
                    size="lg"
                  />
                </Pressable>
                <Pressable onPress={() => handlePress('inc')}>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="chevron-right"
                    size="lg"
                  />
                </Pressable>
              </HStack>
            </HStack>
            <HStack justifyContent="center">
              <HStack
                justifyContent="space-between"
                flexWrap="wrap"
                width="3xs"
                alignItems="center">
                {MONTHS_PICKER.map(val => (
                  <Button
                    bgColor={
                      isEqual(val.numMonth, month) ? 'primary.400' : '#fff'
                    }
                    my={1}
                    height="12"
                    width="12"
                    _text={{
                      fontSize: 'xs',
                      color: isEqual(val.numMonth, month) ? '#fff' : 'gray.800',
                    }}
                    borderRadius="full"
                    key={val.id}
                    onPress={() => setMonth(val.numMonth)}>
                    {val.shortMonth}
                  </Button>
                ))}
              </HStack>
            </HStack>

            <HStack justifyContent="flex-end">
              <Button
                disabled={isEmpty(month)}
                rounded="full"
                w="50%"
                mt={3}
                bgColor={isEmpty(month) ? 'warmGray.400' : 'secondary.400'}
                _pressed={{bgColor: 'secondary.900'}}
                onPress={handlePressConfirm}>
                CONFIRM
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default MonthYearPicker;
