import React, {useState, useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Pressable,
  FlatList,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {isEqual, isEmpty, sumBy} from 'lodash';
import {useIsFocused} from '@react-navigation/native';

import {
  Card,
  AppHeader,
  BottomNavigation,
  MonthYearPicker,
  EmptyData,
} from '../../components';
import {RealmContext} from '../../models';
import {Expense} from '../../models/Expense';
import {Income} from '../../models/Income';
import {Form} from '../components';
import {globalStyle} from '../../styles/styles';
import {formatAmount} from '../../utils/utils';
const {useRealm} = RealmContext;

type ObjectClassIncome<Income> = Income;
type ObjectClassExpense<Expense> = Expense;

const ITEMS = [
  {
    id: 1,
    bgColor: 'secondary.400',
    label: 'Total Income',
    type: 'Income',
  },
  {
    id: 2,
    bgColor: 'primary.400',
    label: 'Total Expense',
    type: 'Expense',
  },
];

const Expenses = () => {
  const realm = useRealm();
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState('Expense');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    start: moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
    end: moment().endOf('month').format('YYYY-MM-DD 23:59:59'),
  });
  const [expense, setExpense] = useState<ObjectClassIncome<any>[]>([]);
  const [income, setIncome] = useState<ObjectClassExpense<any>[]>([]);
  const [total, setTotal] = useState({
    expense: '0',
    income: '0',
  });

  const updateData = () => {
    const expenseData = realm
      .objects(Expense)
      .filtered(
        'date >= $0 && date <= $1',
        moment(selectedDate.start).toDate(),
        moment(selectedDate.end).toDate(),
      )
      .sorted('date', true);
    const incomeData = realm
      .objects(Income)
      .filtered(
        'date >= $0 && date <= $1',
        moment(selectedDate.start).toDate(),
        moment(selectedDate.end).toDate(),
      )
      .sorted('date', true);

    setExpense([...expenseData]);
    setIncome([...incomeData]);
    setTotal({
      expense: formatAmount(sumBy([...expenseData], 'amount')),
      income: formatAmount(sumBy([...incomeData], 'amount')),
    });
  };

  useEffect(() => {
    updateData();
  }, [isFocused, selectedDate, selected, isModalOpen]);

  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Expenses" />
      <MonthYearPicker
        isOpen={isPickerOpen}
        setIsOpen={setIsPickerOpen}
        monthVal={moment(selectedDate.start).format('MM')}
        yearVal={moment(selectedDate.start).format('YYYY')}
        handleOnConfirm={selected => {
          setSelectedDate({
            start: moment(selected)
              .startOf('month')
              .format('YYYY-MM-DD 00:00:00'),
            end: moment(selected).endOf('month').format('YYYY-MM-DD 23:59:59'),
          });
        }}
      />
      <Form
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        type="Income"
        action="New"
      />
      <VStack flex={1} space={5} mt={10}>
        <Box px={5}>
          <HStack justifyContent="space-between" space={3} alignItems="center">
            {ITEMS.map(item => (
              <Pressable
                key={item.id}
                flex={1}
                onPress={() => setSelected(item.type)}>
                {({isPressed}) => {
                  return (
                    <Box
                      bgColor={isPressed ? 'coolGray.400' : item.bgColor}
                      borderRadius="2xl"
                      p={5}>
                      <Text fontSize="md" fontWeight="600" color="white">
                        {item.label}
                      </Text>
                      <Heading mt={1} color="white">
                        {`₱${
                          isEqual(item.type, 'Expense')
                            ? total.expense
                            : total.income
                        }`}
                      </Heading>
                    </Box>
                  );
                }}
              </Pressable>
            ))}
          </HStack>
        </Box>
        <VStack space={3} flex={1} mx={5}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="md">
              {isEqual(selected, 'Expense') ? 'Expenses' : 'Income'}
            </Heading>
            <Pressable onPress={() => setIsPickerOpen(true)}>
              <HStack
                bgColor="primary.400"
                px="3"
                py="1"
                borderRadius="md"
                space="2"
                alignItems="center">
                <Text fontSize="sm" fontWeight="600" color="white">
                  {moment(selectedDate.start).format('MMM YYYY')}
                </Text>
                <Icon
                  as={MaterialCommunityIcons}
                  name="calendar-outline"
                  color="white"
                  size="sm"
                />
              </HStack>
            </Pressable>
          </HStack>
          <FlatList
            data={isEqual(selected, 'Expense') ? expense : income}
            renderItem={({item}) => (
              <Card
                icon={
                  isEqual(selected, 'Expense')
                    ? 'currency-php'
                    : 'wallet-outline'
                }
                amount={formatAmount(item.amount)}
                description={item.description}
                date={moment(item.date).format('ddd, MMM DD YYYY')}
                handlePress={() => {}}
              />
            )}
            contentContainerStyle={
              isEmpty(isEqual(selected, 'Expense') ? expense : income) &&
              globalStyle.emptyFlatList
            }
            ListEmptyComponent={() => <EmptyData />}
          />
        </VStack>
      </VStack>
      <BottomNavigation
        activeId={1}
        handlePressAdd={() => setIsModalOpen(true)}
      />
    </Box>
  );
};

export default Expenses;
