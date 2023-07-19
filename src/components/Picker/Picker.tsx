import React, {useState, useEffect} from 'react';
import {
  Select,
  Icon,
  Box,
  Modal,
  Input,
  Button,
  FormControl,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEqual} from 'lodash';

import {IOption} from '../../types/components/types';

interface IPicker {
  options: IOption[];
  selectedValue: string;
  handlePressSelect: (value: string) => void;
  handlePressAdd?: (value: string) => void;
  placeholder: string;
}

const Picker = ({
  options,
  selectedValue,
  handlePressSelect,
  handlePressAdd,
  placeholder,
}: IPicker) => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('');

  const dismiss = () => setIsModalOpen(false);

  const handlePressItem = (value: string) => {
    if (isEqual(value, 'add')) {
      setCategory('');
      setIsModalOpen(true);
    } else {
      handlePressSelect(value);
    }
  };

  const handlePressConfirm = () => {
    dismiss();
    handlePressAdd && handlePressAdd(category);
  };

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  return (
    <Box>
      <Modal size="lg" isOpen={isModalOpen} onClose={dismiss}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Category</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Category</FormControl.Label>
              <Input value={category} onChangeText={setCategory} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={dismiss}>
                Cancel
              </Button>
              <Button onPress={handlePressConfirm}>Add</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Select
        selectedValue={value}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        dropdownIcon={
          <Icon
            as={MaterialCommunityIcons}
            name="chevron-down"
            color="warmGray.500"
            size="md"
            mr={2}
          />
        }
        _selectedItem={{
          bg: 'primary.400',
        }}
        onValueChange={handlePressItem}>
        {options.map(option => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Select>
    </Box>
  );
};

export default Picker;
