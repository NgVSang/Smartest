import {StyleSheet} from 'react-native';
import {fonts} from '../../constants';

export const styles = StyleSheet.create({
  scroll_view: {
    backgroundColor: '#F7FAFF',
  },
  user: {
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  user_img: {
    width: 128,
    height: 128,
    borderRadius: 6,
  },
  user_name: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    marginTop: 12,
    color: '#2C3442',
  },
  user_role: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 4,
    color: '#394B6A',
    textTransform: 'uppercase',
  },
  information: {
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  information_row: {
    paddingVertical: 15,
    borderTopColor: '#E1E9F6',
    borderStyle: 'solid',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infor_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infor_right: {},
  icon: {
    width: 16,
    height: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
  },
  text_normal_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
    color: '#394B6A',
  },
  text_touch_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
    color: '#126FAF',
  },
  footer_style: {
    backgroundColor: '#F7FAFF',
  },
});
