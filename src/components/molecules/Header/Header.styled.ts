import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  header: {
    height: 100,
    shadowColor: '#0000000D',
    shadowOffset: {width: 4, height: 12},
    shadowOpacity: 0,
    shadowRadius: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  btn: {
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  title_style: {
    color: colors.WHITE,
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
