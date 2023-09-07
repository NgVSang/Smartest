import {StyleSheet} from 'react-native';
import {fonts} from '../../constants';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  content_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: '#394B6A',
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  nullText: {
    textAlign: 'center',
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 50,
  },
  box_style: {
    marginBottom: 15,
  },
});
