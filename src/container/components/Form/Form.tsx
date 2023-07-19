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
import {has, isEqual, omit} from 'lodash';

import {DatePicker, Picker} from '../../../components';
import {RealmContext} from '../../../models';
import {Category} from '../../../models/Category';
import {IOption} from '../../../types/components/types';
const {useQuery, useRealm} = RealmContext;

interface IForm {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
];

const Form = ({isOpen, setIsOpen}: IForm) => {
  const categories = useQuery(Category);
  const realm = useRealm();
  const [categoryOptions, setCategoryOptions] = useState<IOption[]>([]);

  const formik = useFormik({
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
      category: Yup.string().test(
        'isRequired',
        'This is a required field',
        function (value) {
          const {type} = this.parent;
          if (type === 'Expense') {
            return Yup.string().required().isValidSync(value);
          }
          return true;
        },
      ),
      notes: Yup.string(),
    }),
    onSubmit: values => {
      let data = {
        _id: new Realm.BSON.UUID(),
        date: moment(values.date).toDate(),
        description: values.description,
        amount: +parseFloat(values.amount).toFixed(2),
        category: realm.objectForPrimaryKey('Category', values.category),
        notes: values.notes,
      };
      if (isEqual(values.type, 'Expense')) {
        realm.write(() => {
          realm.create('Expense', data);
        });
      } else {
        console.log(data);
        realm.write(() => {
          realm.create('Income', omit(data, 'category'));
        });
      }
      formik.resetForm();
      setIsOpen(false);
    },
  });

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
        <Modal.Header>{`New ${formik.values.type}`}</Modal.Header>
        <Modal.Body>
          <VStack space={2}>
            <FormControl>
              <FormControl.Label>Type</FormControl.Label>
              <Picker
                placeholder="Choose Type"
                options={TYPES}
                selectedValue={formik.values.type}
                handlePressSelect={value => handleChangeValue(value, 'type')}
              />
            </FormControl>
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
            {isEqual(formik.values.type, 'Expense') && (
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
