import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  group: {
    width: '100%',
  },
  title: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: colors.DARK_BLUE,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  calender_style: {
    borderRadius: 6,
    shadowColor: '#0000000D',
    shadowOffset: {width: 2, height: 8},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  calender_title_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: colors.DARK_BLUE,
  },
  decription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
  decription_group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decription_btn: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginRight: 10,
  },
  decription_content: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    lineHeight: 13,
    fontWeight: '400',
    color: colors.DARK_BLUE,
  },
});
