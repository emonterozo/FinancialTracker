import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import {Modal, Button, Heading, HStack, Icon, Text, VStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isEqual} from 'lodash';

interface IConfirmationDialog {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  header: string;
  body: string | ReactNode;
  positiveButtonLabel?: string;
  handlePressPositive: () => void;
  negativeButtonLabel?: string;
  handlePressNegative?: () => void;
  isNegativeButtonInvisible?: boolean;
}

const ConfirmationDialog = ({
  isOpen,
  setIsOpen,
  header,
  body,
  positiveButtonLabel,
  handlePressPositive,
  negativeButtonLabel,
  handlePressNegative,
  isNegativeButtonInvisible,
}: IConfirmationDialog) => {
  const dismissAlert = () => setIsOpen(false);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={dismissAlert}>
      <Modal.Content>
        <Modal.Body>
          <VStack space={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <Heading fontSize="md">{header}</Heading>
              <Icon
                onPress={() => {
                  dismissAlert();
                  handlePressNegative && handlePressNegative();
                }}
                as={MaterialCommunityIcons}
                name="close"
                color="warmGray.600"
                size="lg"
              />
            </HStack>
            {isEqual(typeof body, 'string') ? <Text>{body}</Text> : body}
            <HStack justifyContent="flex-end" space={2}>
              {!isNegativeButtonInvisible && (
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => {
                    dismissAlert();
                    handlePressNegative && handlePressNegative();
                  }}>
                  {negativeButtonLabel || 'NO'}
                </Button>
              )}
              <Button onPress={handlePressPositive}>
                {positiveButtonLabel || 'YES'}
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationDialog;
