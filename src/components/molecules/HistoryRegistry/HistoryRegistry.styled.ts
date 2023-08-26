import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  history: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  history_content: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    lineHeight: 18,
    color: '#394B6A',
    fontWeight: '400',
    marginBottom: 6,
  },
  history_group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  history_group_left: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 14,
    fontWeight: '600',
    color: '#394B6A',
    marginRight: 50,
    flex: 1,
  },
  history_group_right: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 11,
    fontWeight: '500',
    color: '#00A32E',
    lineHeight: 16,
    paddingHorizontal: 13,
    paddingVertical: 4,
    backgroundColor: '#E2FFD9',
    borderRadius: 100,
  },
});
