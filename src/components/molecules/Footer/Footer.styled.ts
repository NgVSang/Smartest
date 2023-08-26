import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  footer: {
    height: 76,
    backgroundColor: '#eef2ff',
    paddingTop: 8,
    paddingHorizontal: 15,
    gap: 20,
    flexDirection: 'row',
  },
  footer_btn: {
    flex: 1,
    height: 44,
    borderRadius: 6,
    backgroundColor: '#0F6AA9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancel_btn: {
    flex: 1,
    height: 44,
    borderRadius: 6,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer_text: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 13,
    lineHeight: 22,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});
