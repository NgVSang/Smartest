import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  group: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  date: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: '#394B6A',
  },
  name: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    color: '#394B6A',
    marginTop: 6,
  },
  where: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 6,
    color: '#394B6A',
  },
});
