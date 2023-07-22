import React, {useState, useEffect} from 'react';
import {
  Box,
  Icon,
  VStack,
  FlatList,
  IconButton,
  HStack,
  Heading,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEmpty, isEqual} from 'lodash';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';

import {
  AppHeader,
  BottomNavigation,
  Card,
  EmptyData,
  ConfirmationDialog,
} from '../../components';
import {Form} from '../components';
import {globalStyle} from '../../styles/styles';
import {RealmContext} from '../../models';
import {Subscription} from '../../models/Subscription';
import {formatAmount} from '../../utils/utils';
const {useRealm} = RealmContext;

const ACTIONS = [
  {
    id: 1,
    icon: 'credit-card-outline',
    color: 'primary.500',
    action: 'pay',
  },
  {
    id: 2,
    icon: 'note-edit-outline',
    color: 'secondary.500',
    action: 'edit',
  },
  {
    id: 3,
    icon: 'trash-can-outline',
    color: 'tertiary.500',
    action: 'delete',
  },
];

type ConfirmationType = {
  [key: string]: {
    header: string;
    body: string;
  };
};

const CONFIRMATION: ConfirmationType = {
  pay: {
    header: 'Pay Subscription',
    body: 'Are you sure you want to pay this subscription?',
  },
  edit: {
    header: 'Edit Subscription',
    body: 'Are you sure you want to edit this subscription?',
  },
  delete: {
    header: 'Delete Subscription',
    body: 'Are you sure you want to delete this subscription?',
  },
};

type ObjectClassSubscription<Subscription> = Subscription;
type ISubscriptionProps = {
  item: ObjectClassSubscription<any>;
  index: number;
};

const Subscriptions = () => {
  const realm = useRealm();
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const [subscriptions, setSubscriptions] = useState<
    ObjectClassSubscription<any>[]
  >([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [action, setAction] = useState('pay');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<ObjectClassSubscription<any> | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const getSubscriptions = () => {
    const data = realm.objects(Subscription).sorted('date', true);
    setSubscriptions([...data]);
  };

  useEffect(() => {
    getSubscriptions();
  }, [isFormOpen]);

  const handlePressAction = (
    value: string,
    item: ObjectClassSubscription<any>,
  ) => {
    setSelectedSubscription(item);
    setAction(value);
    setIsConfirmationOpen(true);
  };

  const dismissConfirmation = () => setIsConfirmationOpen(false);

  const handlePressConfirm = () => {
    switch (action) {
      case 'pay':
        dismissConfirmation();
        setIsPaymentOpen(true);
        break;
      case 'edit':
        dismissConfirmation();
        setIsFormOpen(true);
        break;
      case 'delete':
        realm.write(() => {
          const objectToDelete = realm.objectForPrimaryKey(
            'Subscription',
            selectedSubscription._id,
          );
          realm.delete(objectToDelete);
          dismissConfirmation();
          getSubscriptions();
        });
        break;

      default:
        break;
    }
  };

  const handlePressPay = () => {
    let data = {
      _id: new Realm.BSON.UUID(),
      date: moment().toDate(),
      description: selectedSubscription.description,
      amount: +parseFloat(selectedSubscription.amount).toFixed(2),
      category: realm.objectForPrimaryKey(
        'Category',
        selectedSubscription.category._id,
      ),
      notes: '',
    };
    realm.write(() => {
      realm.create('Expense', data);
    });
    setIsPaymentOpen(false);
  };

  const renderSubscription = ({item, index}: ISubscriptionProps) => {
    const closeRow = (i: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[i]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[i];
    };

    const renderRightActions = () => {
      return (
        <HStack alignItems="center" m={2} space={2}>
          {ACTIONS.map(act => (
            <IconButton
              key={act.id}
              icon={
                <Icon
                  color="white"
                  as={MaterialCommunityIcons}
                  name={act.icon}
                />
              }
              bg={act.color}
              size="lg"
              onPress={() => {
                closeRow(index);
                handlePressAction(act.action, item);
              }}
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
          amount={formatAmount(item.amount)}
          date={moment(item.date).format('Do [of the month]')}
          description={item.description}
        />
      </Swipeable>
    );
  };

  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Subscriptions" />
      <ConfirmationDialog
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        header="Payment Confirmation"
        body={
          <VStack my={2} space={1} alignItems="center">
            <Heading size="md" color="warmGray.500">
              Payment Amount:
            </Heading>
            <Heading color="secondary.400">{`₱${formatAmount(
              selectedSubscription?.amount || 0,
            )}`}</Heading>
          </VStack>
        }
        positiveButtonLabel="Confirm"
        negativeButtonLabel="Cancel"
        handlePressPositive={handlePressPay}
      />
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        header={CONFIRMATION[action].header}
        body={CONFIRMATION[action].body}
        positiveButtonLabel="Yes"
        negativeButtonLabel="Cancel"
        handlePressPositive={handlePressConfirm}
      />
      <Form
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        type="Subscription"
        action={isEqual(action, 'edit') ? 'Edit' : 'New'}
        subscription={selectedSubscription}
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
      <BottomNavigation
        activeId={2}
        handlePressAdd={() => setIsFormOpen(true)}
      />
    </Box>
  );
};

export default Subscriptions;
