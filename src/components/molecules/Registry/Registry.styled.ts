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
    shadowOpacity: 0,
    shadowRadius: 0,
    flexDirection: 'row',
  },
  box_left: {
    marginRight: 10,
  },
  box_right: {
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
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
  content_box: {
    width: 100,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  content_box_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
  },
  registration_for: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 16,
  },
  nullImage: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EFF2F8',
  },
  nullImageText: {
    textAlign: 'center',
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 9,
  },
});
