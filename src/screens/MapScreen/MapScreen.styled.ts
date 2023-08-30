import {Dimensions, StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    // backgroundColor:"#FFFFFF"ftg7
  },
  loading: {
    width: width,
    zIndex: 2,
    height: height,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drop_down: {
    position: 'absolute',
    zIndex: 1,
    top: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBlockColor: colors.BLUE,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 10,
    backgroundColor: colors.WHITE,
  },
  drop_text: {
    color: '#2C3442',
    padding: 15,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
  },
  ScrollView: {
    flex: 1,
  },
  searchInput: {
    paddingHorizontal: 15,
    borderBottomColor: '#E1E9F6',
    borderBottomWidth: 1,
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 15,
    color: colors.LIGHT_GRAY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 10,
    backgroundColor: colors.WHITE,
  },
  search_text: {
    borderWidth: 0,
    padding: 0,
    borderColor: '#FFFFFF',
    borderRadius: 0,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    borderTopColor: '#E1E9F6',
    borderTopWidth: 1,
  },
  footer_text: {
    fontFamily: fonts.BE_VIETNAM_PRO_REGULAR,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
    color: '#2C3442',
    fontWeight: '400',
    marginBottom: 8,
    paddingHorizontal: 15,
  },
  footer_btn: {
    width: '100%',
    height: 44,
    borderRadius: 6,
    backgroundColor: '#0F6AA9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutWrapper: {
    width: 150,
    height: 'auto',
    paddingVertical: 10,
  },
  callOutInnerWrapper: {
    flex: 1,
  },
  calloutText: {
    flex: 1,
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 13,
    color: colors.BLUE,
    textAlign: 'center',
  },
});
