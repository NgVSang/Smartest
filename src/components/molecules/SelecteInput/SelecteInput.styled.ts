import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    height: 'auto',
    paddingVertical: 10,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  headerModalWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomColor: colors.DARKER_BLUE,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyled: {
    color: colors.DARKER_BLUE,
    textTransform: 'uppercase',
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 14,
  },
  buttonStyle_text: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 16,
    lineHeight: 24,
    color: '#394B6A',
    fontWeight: '600',
    flex: 1,
  },
  pickerWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    paddingBottom: 10,
    alignItems: 'center',
    borderBlockColor: colors.DARK_BLUE,
    borderBottomWidth: 0.5,
  },
});
