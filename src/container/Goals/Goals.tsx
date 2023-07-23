import React, {useState, useEffect} from 'react';
import {
  Box,
  Icon,
  VStack,
  FlatList,
  IconButton,
  HStack,
  Heading,
  Modal,
  Button,
  Text,
  Input,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEmpty, isEqual, has} from 'lodash';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {
  AppHeader,
  BottomNavigation,
  Card,
  EmptyData,
  ConfirmationDialog,
  Percentage,
} from '../../components';
import {Form} from '../components';
import {globalStyle} from '../../styles/styles';
import {RealmContext} from '../../models';
import {Goal} from '../../models/Goal';
import {formatAmount} from '../../utils/utils';
import {History} from '../../models/History';
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
    icon: 'history',
    color: 'secondary.500',
    action: 'history',
  },
];

type ObjectClassGoal<Goal> = Goal;
type IGoalProps = {
  item: ObjectClassGoal<any>;
  index: number;
};
type ObjectClassHistory<History> = History;

const Goals = () => {
  const realm = useRealm();
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const [goals, setGoals] = useState<ObjectClassGoal<any>[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<ObjectClassGoal<any> | null>(
    null,
  );
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [histories, setHistories] = useState<ObjectClassHistory<any>[]>([]);

  const formik = useFormik({
    initialValues: {
      amount: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('This is a required field'),
    }),
    onSubmit: values => {
      const balance = selectedGoal.balance + parseFloat(values.amount);
      const object = realm.objectForPrimaryKey(Goal, selectedGoal._id);

      if (object) {
        realm.write(() => {
          object.balance = balance;
        });
        realm.write(() => {
          realm.create('History', {
            _id: new Realm.BSON.UUID(),
            date: moment().toDate(),
            amount: +parseFloat(values.amount).toFixed(2),
            goal: realm.objectForPrimaryKey('Goal', selectedGoal?._id),
          });
        });
        setIsPaymentOpen(false);
      }
      formik.resetForm();
    },
  });

  const getGoals = () => {
    const data = realm.objects(Goal).sorted('date', true);
    setGoals([...data]);
  };

  useEffect(() => {
    getGoals();
  }, [isFormOpen, isPaymentOpen]);

  const handlePressAction = (action: string, item: ObjectClassGoal<any>) => {
    setSelectedGoal(item);
    if (isEqual(action, 'history')) {
      const data = realm.objects(History).filtered('goal._id = $0', item._id);
      setHistories([...data]);
      setIsHistoryOpen(true);
    } else {
      setIsPaymentOpen(true);
    }
  };

  const renderGoals = ({item, index}: IGoalProps) => {
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
          icon="piggy-bank-outline"
          amount={`₱${formatAmount(item.balance)}`}
          date={moment(item.date).format('ddd, MMM DD YYYY')}
          description={item.description}
        />
      </Swipeable>
    );
  };

  const getPercentage = () => {
    const percentage = (selectedGoal?.balance / selectedGoal?.amount) * 100;

    return percentage > 100 ? '100%' : `${percentage}%`;
  };

  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Goals" />
      <ConfirmationDialog
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        header="Savings Confirmation"
        body={
          <VStack my={2} space={1} alignItems="center">
            <FormControl isInvalid={has(formik.errors, 'amount')}>
              <FormControl.Label>Amount</FormControl.Label>
              <Input
                placeholder="Input Amount"
                value={formik.values.amount}
                onChangeText={text => formik.setFieldValue('amount', text)}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {formik.errors.amount}
              </FormControl.ErrorMessage>
            </FormControl>
          </VStack>
        }
        positiveButtonLabel="Confirm"
        negativeButtonLabel="Cancel"
        handlePressPositive={() => formik.handleSubmit()}
      />
      <Modal
        size="xl"
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}>
        <Modal.Content p={5} maxHeight="60%">
          <VStack space={3}>
            <HStack alignItems="center" space={1}>
              <Icon
                as={MaterialCommunityIcons}
                name="file-clock-outline"
                color="primary.400"
                size="lg"
              />
              <Heading fontSize="md">HISTORY</Heading>
            </HStack>
            <Box maxHeight="79%">
              <VStack space={1} alignItems="center" my={3}>
                <Heading size="md" alignItems="center">
                  Target Amount:{' '}
                  <Heading color="secondary.400" size="md">
                    {`₱${formatAmount(selectedGoal?.amount || 0)}`}
                  </Heading>
                </Heading>
                <Percentage
                  percent={getPercentage()}
                  fillColor="tertiary.400"
                  backgroundColor="white"
                  borderColor="tertiary.400"
                />
              </VStack>
              <FlatList
                data={histories}
                renderItem={({item}) => (
                  <Box bgColor="gray.100" p={2} my={1}>
                    <Text>
                      I saved an amount of{' '}
                      <Text bold>{`₱${formatAmount(item.amount)}`}</Text> on{' '}
                      <Text bold>
                        {moment(item.date).format('ddd, MMM DD YYYY hh:mm A')}
                      </Text>
                    </Text>
                  </Box>
                )}
                ListEmptyComponent={
                  <Box alignItems="center">
                    <Heading color="warmGray.400" size="sm">
                      Opps, Still no transactions made
                    </Heading>
                  </Box>
                }
              />
            </Box>
            <Button size="sm" onPress={() => setIsHistoryOpen(false)}>
              CLOSE
            </Button>
          </VStack>
        </Modal.Content>
      </Modal>
      <Form
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        type="Goal"
        action="New"
      />
      <VStack flex={1} space={5} mt={10} p={5}>
        <FlatList
          data={goals}
          renderItem={renderGoals}
          contentContainerStyle={isEmpty(goals) && globalStyle.emptyFlatList}
          ListEmptyComponent={<EmptyData />}
        />
      </VStack>
      <BottomNavigation
        activeId={4}
        handlePressAdd={() => setIsFormOpen(true)}
      />
    </Box>
  );
};

export default Goals;
