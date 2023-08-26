import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  group: {
    width: '100%',
  },
  inputType: {
    fontWeight: '400',
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    lineHeight: 22,
    color: colors.SLATE_GRAY,
  },
  boxInput: {
    marginBottom: -5,
  },
  textLabel: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontWeight: '500',
    fontSize: 13,
    color: colors.LIGHT_GRAY,
    lineHeight: 20,
    marginBottom: 6,
  },
  inputContainer: {
    height: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.LIGHT_BLUE_GRAY,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconWrapper: {
    position: 'absolute',
    right: 15,
    top: 32,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_style: {
    width: 20,
    height: 20,
  },
  error_message: {
    marginTop: 5,
    marginLeft: 10,
  },
});
