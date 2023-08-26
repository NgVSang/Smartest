import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  scroll_view: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#eef2ff',
    paddingBottom: 20,
  },
  box_style: {
    marginTop: 10,
  },
  group: {
    marginTop: 20,
  },
  recordsTotal: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
    color: '#394B6A',
    textTransform: 'uppercase',
    marginTop: 20,
  },
  footer: {
    height: 76,
    width: '100%',
    backgroundColor: '#eef2ff',
    paddingTop: 8,
    paddingHorizontal: 15,
  },
  footer_btn: {
    width: '100%',
    height: 44,
    borderRadius: 6,
    backgroundColor: '#0F6AA9',
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
