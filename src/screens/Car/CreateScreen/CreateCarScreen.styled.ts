import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, fonts} from '../../../constants';

export const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loading: {
    width: SCREEN_WIDTH,
    zIndex: 2,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input_group: {
    width: '100%',
    paddingHorizontal: 15,
  },
  inputWrapper: {
    marginTop: 30,
  },
  photo: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  photo_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  photo_group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo_group_items: {
    marginTop: 15,
    marginRight: 15,
  },
  btn_delete: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
  label_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  btn_add: {
    width: 45,
    height: 45,
    borderRadius: 3,
    marginTop: 15,
    borderColor: '#E1E9F6',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F9FF',
  },
  footer_style: {
    backgroundColor: '#FFFFFF',
  },
  input_style: {
    paddingVertical: 10,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3442',
  },
});
