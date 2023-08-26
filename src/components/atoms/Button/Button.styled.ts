import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 30,
    flexDirection: 'row',
  },
  text: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 22,
    color: colors.WHITE,
  },
  loading: {
    marginRight: 10,
  },
});
