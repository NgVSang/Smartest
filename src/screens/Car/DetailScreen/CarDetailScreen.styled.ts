import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants';

export const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  group: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  group_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  group_content: {
    paddingVertical: 10,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3442',
  },
  photo: {
    paddingLeft: 15,
    marginTop: 30,
    marginBottom: 50,
  },
  photo_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  photo_group: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo_style: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#2C3442',
  },
  modal_content: {
    padding: 22,
  },
  modal_content_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    color: '#2C3442',
  },
});
