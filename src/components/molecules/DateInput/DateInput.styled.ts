import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  label_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  input_style: {
    paddingVertical: 10,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3442',
    height: 50,
  },
  icon_position: {
    position: 'absolute',
    bottom: 5,
    right: -10,
    padding: 10,
  },
  icon_style: {
    width: 14,
    height: 14,
  },
});
