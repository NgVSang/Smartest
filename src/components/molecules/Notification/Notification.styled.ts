import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  notification: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  group: {
    width: '100%',
    paddingRight: 0,
    flex: 1,
  },
  content_read: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#394B6A',
  },
  content_not_read: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    color: '#394B6A',
  },
  time: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 22,
    color: '#394B6A',
    marginTop: 5,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
});
