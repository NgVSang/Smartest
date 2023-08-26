import {StyleSheet} from 'react-native';
import {fonts} from '../../constants';

export const styles = StyleSheet.create({
  page_content: {
    width: '100%',
    flex: 1,
  },
  car_infor: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#F7FAFF',
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 5,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  car_infor_left: {
    alignItems: 'flex-start',
    width: '70%',
  },
  car_infor_right: {
    alignItems: 'flex-end',
    width: '30%',
  },
  car_infor_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: '#394B6A',
  },
  license_plates_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#394B6A',
  },
  number_error: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#BF0000',
  },
  scroll_view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
