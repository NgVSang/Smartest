import {StyleSheet} from 'react-native';
import {fonts} from '../../constants';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  avatar: {
    paddingVertical: 30,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
  },
  avatar_title: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    color: '#394B6A',
    opacity: 0.7,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  avatar_group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar_image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  avatar_event_group: {
    marginLeft: 20,
  },
  avatar_event: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar_event_text: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  text_input_style: {
    paddingTop: 30,
  },
  footer_style: {
    backgroundColor: '#FFFFFF',
  },
  label_style: {
    fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
    color: '#394B6A',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    opacity: 0.7,
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
    opacity: 0.5,
  },
});
