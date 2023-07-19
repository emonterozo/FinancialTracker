import React, {useState} from 'react';
import {Box, Icon, VStack, FlatList, IconButton, HStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEmpty} from 'lodash';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {
  AppHeader,
  BottomNavigation,
  Card,
  EmptyData,
  ConfirmationDialog,
} from '../../components';
import {globalStyle} from '../../styles/styles';

const ACTIONS = [
  {
    id: 1,
    icon: 'credit-card-outline',
    color: 'primary.500',
    action: 'pay',
  },
  {
    id: 2,
    icon: 'trash-can-outline',
    color: 'error.500',
    action: 'delete',
  },
];

const CONFIRMATION: any = {
  pay: {
    header: 'Pay Subscription',
    body: 'Are you sure you want to pay this subscription?',
  },
  delete: {
    header: 'Delete Subscription',
    body: 'Are you sure you want to delete this subscription?',
  },
};

const Subscriptions = () => {
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const [subscriptions, setSubscriptions] = useState([1, 2, 3, 4]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [action, setAction] = useState('pay');

  const handlePressAction = (value: string) => {
    setAction(value);
    setIsConfirmationOpen(true);
  };

  const renderSubscription = ({item, index}) => {
    const closeRow = (i: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[i]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[i];
    };

    const renderRightActions = () => {
      return (
        <HStack alignItems="center" m={2} space={2}>
          {ACTIONS.map(item => (
            <IconButton
              key={item.id}
              icon={
                <Icon
                  color="white"
                  as={MaterialCommunityIcons}
                  name={item.icon}
                />
              }
              bg={item.color}
              size="lg"
              onPress={() => handlePressAction(item.action)}
            />
          ))}
        </HStack>
      );
    };

    return (
      <Swipeable
        renderRightActions={() => renderRightActions()}
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}>
        <Card
          icon="calendar-month"
          amount="3,000.00"
          date="17th of the month"
          description="Internet"
        />
      </Swipeable>
    );
  };

  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Subscriptions" />
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        header={CONFIRMATION[action].header}
        body={CONFIRMATION[action].body}
        positiveButtonLabel="Yes"
        negativeButtonLabel="Cancel"
        handlePressNegative={() => {}}
        handlePressPositive={() => {}}
      />
      <VStack flex={1} space={5} mt={10} p={5}>
        <FlatList
          data={subscriptions}
          renderItem={renderSubscription}
          contentContainerStyle={
            isEmpty(subscriptions) && globalStyle.emptyFlatList
          }
          ListEmptyComponent={<EmptyData />}
        />
      </VStack>
      <BottomNavigation activeId={2} handlePressAdd={() => {}} />
    </Box>
  );
};

export default Subscriptions;
