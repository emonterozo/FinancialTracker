import React, {useState} from 'react';
import {Input, Box, Modal, Button} from 'native-base';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

interface IDatePicker {
  date: string;
  handlePressOpenPicker: () => void;
  handlePressClosePicker: () => void;
  handlePressSelect: (date: string) => void;
}

const DatePicker = ({
  date,
  handlePressOpenPicker,
  handlePressClosePicker,
  handlePressSelect,
}: IDatePicker) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);

  const handlePress = () => {
    handlePressOpenPicker();
    setIsPickerOpen(true);
  };

  const dismiss = () => {
    handlePressClosePicker();
    setIsPickerOpen(false);
    setSelectedDate(date);
  };

  const handlePressSelectDate = () => {
    setIsPickerOpen(false);
    handlePressSelect(selectedDate);
  };

  return (
    <Box>
      <Modal size="lg" isOpen={isPickerOpen} onClose={dismiss}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Select Date</Modal.Header>
          <Modal.Body>
            <Calendar
              theme={{
                backgroundColor: '#fafafa',
                calendarBackground: '#fafafa',
                textMonthFontWeight: 'bold',
                monthTextColor: '#ff653a',
                arrowColor: '#616566',
                todayTextColor: '#8032f9',
              }}
              maxDate={moment().format('YYYY-MM-DD')}
              onDayPress={day => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#ff653a',
                },
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={dismiss}>
                Cancel
              </Button>
              <Button onPress={handlePressSelectDate}>Select</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Input
        value={moment(date).format('ddd, MMMM DD YYYY')}
        isReadOnly
        onPressIn={handlePress}
      />
    </Box>
  );
};

export default DatePicker;
