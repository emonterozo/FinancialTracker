import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type StackParamList = {
  Home: undefined;
  Expenses: undefined;
  Goals: undefined;
  Subscriptions: undefined;
  Debt: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  StackParamList,
  'Home',
  'Stack'
>;

export type ExpensesScreenProps = NativeStackScreenProps<
  StackParamList,
  'Expenses',
  'Stack'
>;

export type GoalsScreenProps = NativeStackScreenProps<
  StackParamList,
  'Goals',
  'Stack'
>;

export type SubscriptionsScreenProps = NativeStackScreenProps<
  StackParamList,
  'Subscriptions',
  'Stack'
>;

export type DebtScreenProps = NativeStackScreenProps<
  StackParamList,
  'Debt',
  'Stack'
>;
