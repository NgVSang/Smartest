import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.LAVENDER_BLUE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  header_left: {
    flexDirection: 'row',
  },
  header_left_hi: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 11,
    lineHeight: 16,
    color: colors.DARK_BLUE,
    fontWeight: '400',
  },
  header_left_name: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 17,
    lineHeight: 24,
    color: '#2E333D',
  },
  header_right: {
    flexDirection: 'row',
  },
  header_right_point: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: colors.DARK_BLUE,
  },
  scroll_view: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.LAVENDER_BLUE,
    paddingBottom: 20,
  },
  calender_style: {
    marginTop: 10,
    marginBottom: 30,
  },
  manager: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  manager_box: {
    width: '31%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'column',
    borderRadius: 6,
    shadowColor: '#0000000D',
    shadowOffset: {width: 2, height: 8},
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: colors.WHITE,
    marginBottom: 15,
  },
  manager_box_icon: {
    width: 'auto',
    height: 30,
    marginBottom: 8,
  },
  icon_style: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  manager_content: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: '#394B6A',
  },
});
