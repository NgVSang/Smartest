import {Dimensions, StyleSheet} from 'react-native';
import {colors, fonts} from '../../../constants';

const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    alignItems: 'center',
    width: WIDTH - 80,
    position: 'relative',
    flexDirection: 'column',
  },
  modalWrapper: {
    width: '100%',
  },
  modalWrapperTop: {},
  modalWrapperBottom: {},
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
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
  btn_group: {
    flexDirection: 'row',
    borderTopColor: '#E1E9F6',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  btn_style: {
    width: '50%',
    paddingVertical: 12,
  },
  btn_text: {
    fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
