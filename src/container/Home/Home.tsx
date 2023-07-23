import React, {useState, useEffect, useContext} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  FlatList,
  Pressable,
  Icon,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart} from 'react-native-gifted-charts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {isEmpty, groupBy, sumBy, isEqual, isNull} from 'lodash';
import {useIsFocused} from '@react-navigation/native';

import {AppHeader, BottomNavigation, Card} from '../../components';
import {HomeScreenProps} from '../../types/navigation/types';
import {Form} from '../components';
import {globalStyle} from '../../styles/styles';
import {RealmContext} from '../../models';
import {Account} from '../../models/Account';
import {Expense} from '../../models/Expense';
import {formatAmount, formatTotalAmount} from '../../utils/utils';
import GlobalContext from '../../context/context';
const {useRealm} = RealmContext;

type ObjectClassExpense<Expense> = Expense;

const Home = ({navigation}: HomeScreenProps) => {
  const realm = useRealm();
  const {userId} = useContext(GlobalContext);
  const isFocused = useIsFocused();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    start: moment().startOf('year').format('YYYY-MM-DD 00:00:00'),
    end: moment().endOf('month').format('YYYY-MM-DD 23:59:59'),
  });
  const [recentExpense, setRecentExpense] = useState<ObjectClassExpense<any>[]>(
    [],
  );
  const [yearExpense, setYearExpense] = useState<any>([]);

  const getRecentExpense = () => {
    const expenseData = realm.objects(Expense).sorted('date', true).slice(0, 5);
    setRecentExpense([...expenseData]);
  };

  const getYearExpense = () => {
    const expense = realm
      .objects(Expense)
      .filtered(
        'date >= $0 && date <= $1',
        moment(selectedDate.start).toDate(),
        moment(selectedDate.end).toDate(),
      )
      .sorted('date', true);

    const groupedData = groupBy(expense, item => {
      const date = new Date(item.date);
      const month = date.toLocaleString('default', {month: 'short'});
      return month;
    });

    const monthlyTotals = [];

    for (let i = 0; i < moment(selectedDate.end).month() + 1; i++) {
      const month = moment(selectedDate.start)
        .clone()
        .add(i, 'months')
        .format('MMM');
      const monthData = groupedData[month] || [];
      const totalAmount = sumBy(monthData, 'amount');
      monthlyTotals.push({month, totalAmount});
    }

    let highestMonth = '';
    let highestAmount = 0;

    for (const monthData of monthlyTotals) {
      if (monthData.totalAmount > highestAmount) {
        highestMonth = monthData.month;
        highestAmount = monthData.totalAmount;
      }
    }

    const data = monthlyTotals.map(item => ({
      value: item.totalAmount,
      label: item.month,
      frontColor: isEqual(item.month, highestMonth) ? '#8032f9' : undefined,
      labelTextStyle: {
        color: isEqual(item.month, highestMonth) ? '#8032f9' : '#616566',
        textAlign: 'center',
      },
      topLabelComponent: () => (
        <Text fontSize="xs" bold color="#616566">
          {`₱${formatTotalAmount(item.totalAmount)}`}
        </Text>
      ),
    }));
    setYearExpense(data);
  };

  useEffect(() => {
    getRecentExpense();
  }, [isModalOpen, isFocused]);

  useEffect(() => {
    getYearExpense();
  }, [selectedDate, isModalOpen, isFocused]);

  const getBalance = () => {
    let amount = 0;
    if (!isNull(userId)) {
      const data = realm.objectForPrimaryKey(Account, userId);
      amount = data?.amount || 0;
    }

    return `₱${formatAmount(amount)}`;
  };

  return (
    <Box flex={1} safeAreaTop bgColor="#ffffff">
      <AppHeader label="Home" />
      <Form
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        type="Expense"
        action="New"
      />
      <Box h="25%" p={5} justifyContent="center">
        <VStack space={3}>
          <Box bgColor="tertiary.400" p={8} borderRadius="2xl">
            <Text fontSize="md" fontWeight="900" color="#616566">
              Total Balance
            </Text>
            <Heading mt={1} color="white">
              {getBalance()}
            </Heading>
            <Box mt="5">
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{borderRadius: 20}}
                colors={['#ff653a', '#ffa288', '#d5d8dd']}>
                <Box h="1.5" bgColor="transparent" borderRadius="full" />
              </LinearGradient>
            </Box>
          </Box>
        </VStack>
      </Box>
      <VStack space={3} justifyContent="center">
        <HStack px={5} alignItems="center" justifyContent="space-between">
          <Heading size="md">Analytics</Heading>
          <Pressable onPress={() => console.log('d')}>
            {({isPressed}) => {
              return (
                <HStack
                  bgColor={isPressed ? 'primary.100' : 'primary.400'}
                  px="3"
                  py="1"
                  borderRadius="md"
                  space="2"
                  alignItems="center">
                  <Text fontSize="sm" fontWeight="600" color="white">
                    Year - 2022
                  </Text>
                  <Icon
                    as={MaterialCommunityIcons}
                    name="calendar-outline"
                    color="white"
                    size="sm"
                  />
                </HStack>
              );
            }}
          </Pressable>
        </HStack>
        <Box mr={10}>
          <BarChart
            barWidth={45}
            barBorderRadius={5}
            frontColor="lightgray"
            data={yearExpense}
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText={true}
            yAxisLabelWidth={0}
            dashGap={2}
            hideRules
          />
        </Box>
      </VStack>
      <VStack space={3} flex={1} px={5}>
        <HStack alignItems="center" justifyContent="space-between">
          <Heading size="md">Expenses</Heading>
          <Pressable onPress={() => navigation.navigate('Expenses')}>
            {({isPressed}) => {
              return (
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color={isPressed ? 'primary.400' : 'warmGray.700'}>
                  View All
                </Text>
              );
            }}
          </Pressable>
        </HStack>
        <FlatList
          data={recentExpense}
          renderItem={({item}) => (
            <Card
              icon="currency-php"
              amount={`₱${formatAmount(item.amount)}`}
              description={item.description}
              date={moment(item.date).format('ddd, MMM DD YYYY')}
              handlePress={() => {}}
            />
          )}
          contentContainerStyle={
            isEmpty(recentExpense) && globalStyle.emptyFlatList
          }
          ListEmptyComponent={() => (
            <Heading size="sm" color="warmGray.400">
              No recent expenses.
            </Heading>
          )}
        />
      </VStack>
      <BottomNavigation
        activeId={1}
        handlePressAdd={() => setIsModalOpen(true)}
      />
    </Box>
  );
};

export default Home;
