import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

export const styles = StyleSheet.create({
  page_content: {
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    marginTop: 20,
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#394B6A',
    marginBottom: 30,
  },
  input_style: {
    width: '100%',
    paddingLeft: 44,
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    color: colors.DARKER_BLUE,
  },
  search_style: {
    height: 46,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E1E9F6',
    shadowColor: '#FFFFFF',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_input_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: '#394B6A',
  },
  footer_btn: {
    width: '100%',
    height: 44,
    borderRadius: 6,
    backgroundColor: '#0F6AA9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
});
