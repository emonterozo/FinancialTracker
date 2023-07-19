import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
  emptyFlatList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
