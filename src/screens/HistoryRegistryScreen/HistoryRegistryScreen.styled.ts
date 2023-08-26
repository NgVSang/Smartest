import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

export const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 15,
    backgroundColor: '#F7FAFF',
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 5,
  },
  buttonStyle_img: {
    width: 44,
    height: 44,
    resizeMode: 'cover',
    borderRadius: 3,
    marginRight: 12,
  },
  buttonStyle_text: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 16,
    lineHeight: 24,
    color: '#394B6A',
    fontWeight: '600',
    flex: 1,
  },
  dropdownStyle: {
    borderRadius: 6,
    height: 300,
  },
  rowStyle: {
    paddingHorizontal: 30,
    height: null,
    paddingVertical: 15,
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  nullImageWrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#394B6A',
    marginRight: 12,
  },
  nullText: {
    textAlign: 'center',
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 9,
  },
  textStyled: {
    color: colors.BLUE,
    textTransform: 'uppercase',
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 20,
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
  pickerWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
});
