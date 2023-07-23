import React, {useState, Dispatch, SetStateAction, useEffect} from 'react';
import {
  Input,
  Modal,
  FormControl,
  Button,
  WarningOutlineIcon,
  VStack,
  TextArea,
} from 'native-base';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {has, isEqual, isEmpty} from 'lodash';

import {DatePicker, Picker} from '../../../components';
import {RealmContext} from '../../../models';
import {Category} from '../../../models/Category';
import {Subscription} from '../../../models/Subscription';
import {IOption} from '../../../types/components/types';
const {useQuery, useRealm} = RealmContext;

type ObjectClassSubscription<Subscription> = Subscription;

interface IForm {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  type: 'Expense' | 'Subscription' | 'Income' | 'Debt' | 'Goal';
  action: 'New' | 'Edit';
  subscription?: ObjectClassSubscription<any>;
}

const TYPES = [
  {
    label: 'Expense',
    value: 'Expense',
  },
  {
    label: 'Income',
    value: 'Income',
  },
  {
    label: 'Subscription',
    value: 'Subscription',
  },
  {
    label: 'Goal',
    value: 'Goal',
  },
  {
    label: 'Debt',
    value: 'Debt',
  },
];

const STATUS = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
];

const TYPE = {
  Expense: {
    initialValues: {
      type: 'Expense',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      category: '',
      notes: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('This is a required field'),
      date: Yup.string().required('This is a required field'),
      description: Yup.string().required('This is a required field'),
      amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('This is a required field'),
      category: Yup.string().required('This is a required field'),
      notes: Yup.string(),
    }),
  },
  Subscription: {
    initialValues: {
      type: 'Subscription',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      category: '',
      status: 'Active',
      notes: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('This is a required field'),
      date: Yup.string().required('This is a required field'),
      description: Yup.string().required('This is a required field'),
      amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('This is a required field'),
      category: Yup.string().required('This is a required field'),
      status: Yup.string().required('This is a required field'),
      notes: Yup.string(),
    }),
  },
  Income: {
    initialValues: {
      type: 'Income',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      notes: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('This is a required field'),
      date: Yup.string().required('This is a required field'),
      description: Yup.string().required('This is a required field'),
      amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('This is a required field'),
      notes: Yup.string(),
    }),
  },
  Debt: {
    initialValues: {
      type: 'Debt',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      notes: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('This is a required field'),
      date: Yup.string().required('This is a required field'),
      description: Yup.string().required('This is a required field'),
      amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('This is a required field'),
      notes: Yup.string(),
    }),
  },
  Goal: {
    initialValues: {
      type: 'Goal',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      notes: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('This is a required field'),
      date: Yup.string().required('This is a required field'),
      description: Yup.string().required('This is a required field'),
      amount: Yup.number()
        .typeError('Please enter a valid number')
        .required('This is a required field'),
      notes: Yup.string(),
    }),
  },
};

const Form = ({isOpen, setIsOpen, type, action, subscription}: IForm) => {
  const categories = useQuery(Category);
  const realm = useRealm();
  const [categoryOptions, setCategoryOptions] = useState<IOption[]>([]);

  const formik = useFormik({
    ...TYPE[type],
    onSubmit: async values => {
      if (isEqual(action, 'Edit')) {
        const object = realm.objectForPrimaryKey(
          Subscription,
          subscription._id,
        );

        if (object) {
          realm.write(() => {
            (object.date = moment(values.date).toDate()),
              (object.description = values.description),
              (object.amount = +parseFloat(values.amount).toFixed(2)),
              (object.category = realm.objectForPrimaryKey(
                'Category',
                values?.category,
              )),
              (object.status = values?.status),
              (object.notes = values.notes);
          });
        }
      } else {
        let data = {
          _id: new Realm.BSON.UUID(),
          date: moment(values.date).toDate(),
          description: values.description,
          amount: +parseFloat(values.amount).toFixed(2),
          status: values?.status,
          notes: values.notes,
        };

        if (
          isEqual(values.type, 'Subscription') ||
          isEqual(values.type, 'Expense')
        ) {
          data = {
            ...data,
            category: realm.objectForPrimaryKey('Category', values?.category),
          };
        }

        realm.write(() => {
          realm.create(values.type, data);
        });
      }

      formik.resetForm();
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (subscription && !isEmpty(categoryOptions)) {
      for (const key in subscription) {
        if (isEqual(key, 'category')) {
        } else if (isEqual(key, 'date')) {
          formik.setFieldValue(
            key,
            moment(subscription[key]).format('YYYY-MM-DD'),
          );
        } else {
          formik.setFieldValue(key, subscription[key].toString());
        }
      }
    }
  }, [subscription, categoryOptions]);

  useEffect(() => {
    const formattedCategories = categories.map(item => ({
      label: item.category,
      value: item._id,
    }));
    setCategoryOptions([
      ...formattedCategories,
      {label: 'Add New Category', value: 'add'},
    ]);
  }, [categories]);

  const handlePressAddCategory = (value: string) => {
    realm.write(() => {
      realm.create('Category', {category: value, _id: new Realm.BSON.UUID()});
    });
  };

  const handleChangeValue = (value: string, field: string) => {
    formik.setFieldValue(field, value);
  };

  const dismiss = () => {
    setIsOpen(false);
    formik.resetForm();
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={dismiss}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{`${action} ${formik.values.type}`}</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            {isEqual(action, 'New') && (
              <FormControl>
                <FormControl.Label>Type</FormControl.Label>
                <Picker
                  placeholder="Choose Type"
                  options={TYPES}
                  selectedValue={formik.values.type}
                  handlePressSelect={value => handleChangeValue(value, 'type')}
                />
              </FormControl>
            )}
            <FormControl>
              <FormControl.Label>Date</FormControl.Label>
              <DatePicker
                date={formik.values.date}
                handlePressOpenPicker={() => setIsOpen(false)}
                handlePressClosePicker={() => setIsOpen(true)}
                handlePressSelect={date => {
                  setIsOpen(true);
                  handleChangeValue(date, 'date');
                }}
              />
            </FormControl>
            <FormControl isInvalid={has(formik.errors, 'description')}>
              <FormControl.Label>Description</FormControl.Label>
              <Input
                placeholder="Input Description"
                value={formik.values.description}
                onChangeText={text => handleChangeValue(text, 'description')}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {formik.errors.description}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={has(formik.errors, 'amount')}>
              <FormControl.Label>Amount</FormControl.Label>
              <Input
                placeholder="Input Amount"
                value={formik.values.amount}
                onChangeText={text => handleChangeValue(text, 'amount')}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {formik.errors.amount}
              </FormControl.ErrorMessage>
            </FormControl>
            {(isEqual(formik.values.type, 'Expense') ||
              isEqual(formik.values.type, 'Subscription')) && (
              <FormControl isInvalid={has(formik.errors, 'category')}>
                <FormControl.Label>Category</FormControl.Label>
                <Picker
                  placeholder="Choose Category"
                  options={categoryOptions}
                  selectedValue={formik.values.category}
                  handlePressSelect={value =>
                    handleChangeValue(value, 'category')
                  }
                  handlePressAdd={handlePressAddCategory}
                />
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.category}
                </FormControl.ErrorMessage>
              </FormControl>
            )}
            {isEqual(formik.values.type, 'Subscription') && (
              <FormControl>
                <FormControl.Label>Status</FormControl.Label>
                <Picker
                  placeholder="Choose Status"
                  options={STATUS}
                  selectedValue={formik.values.status}
                  handlePressSelect={value =>
                    handleChangeValue(value, 'status')
                  }
                />
              </FormControl>
            )}
            <FormControl>
              <FormControl.Label>Notes</FormControl.Label>
              <TextArea
                autoCompleteType="off"
                h="16"
                totalLines={5}
                value={formik.values.notes}
                onChangeText={text => handleChangeValue(text, 'notes')}
              />
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={dismiss}>
              Cancel
            </Button>
            <Button onPress={() => formik.handleSubmit()}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default Form;
