import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  container: {
    paddingBottom: 50,
  },
  title: {
    paddingTop: 40,
    paddingLeft: 42,
    paddingBottom: 24,
  },
  title_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: colors.DARKER_BLUE,
  },
  form_group: {
    width: '100%',
    paddingHorizontal: 50,
  },
  form_input: {
    marginBottom: 24,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer_content: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.LIGHT_GRAY,
  },
  footer_register: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    color: '#0F6AA9',
    textDecorationLine: 'underline',
  },
  btn_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 22,
  },
  btn_login: {
    width: '100%',
    height: 40,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F6AA9',
    shadowColor: '#0000001F',
    shadowOffset: {width: 4, height: 12},
    shadowOpacity: 0,
    shadowRadius: 0,
    marginBottom: 30,
  },
  forgotPass: {},
  textForgot: {},
});
