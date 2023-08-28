import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input_group: {
    width: '100%',
    paddingHorizontal: 15,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 5,
    borderStyle: 'solid',
    paddingBottom: 30,
  },
  input_style: {
    marginTop: 30,
  },
  input_picker: {
    flex: 1,
  },
  rule_group: {
    marginTop: 25,
    width: '100%',
    paddingHorizontal: 15,
  },
  footer_style: {
    backgroundColor: '#FFFFFF',
  },
  select_input: {
    width: '100%',
  },
  label: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  form_style: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    height: 'auto',
    paddingVertical: 10,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  input_text_style: {
    textAlign: 'left',
    marginHorizontal: 0,
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    color: '#394B6A',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  dropdownStyle: {
    borderRadius: 6,
  },
  rowStyle: {
    paddingHorizontal: 30,
  },
  rowTextStyle: {
    textAlign: 'left',
    marginHorizontal: 0,
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    color: '#394B6A',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  selectedRowTextStyle: {
    color: '#BF0000',
  },
});
