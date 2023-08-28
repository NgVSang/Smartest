import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  fee_group_row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  fee_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#2C3442',
    textAlign: 'left',
  },
  fee_content: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#2C3442',
    marginLeft: 20,
    textAlign: 'right',
  },
});
