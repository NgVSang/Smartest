import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  box: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    shadowColor: '#0000000D',
    shadowOffset: {width: 2, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 0,
    flexDirection: 'row',
    elevation: 2,
  },
  box_left: {
    marginRight: 10,
  },
  box_right: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  license_plates: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 14,
    lineHeight: 20,
    color: '#2C3442',
    fontWeight: '500',
  },
  content_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    lineHeight: 18,
    color: '#2C3442',
    fontWeight: '400',
    marginTop: 4,
  },
  group: {
    marginTop: 4,
  },
  content_box: {
    borderRadius: 50,
    width: 190,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06B217',
  },
  content_box_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  message: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 18,
    color: '#A80000',
    marginBottom: 6,
    flex: 1,
  },
});
