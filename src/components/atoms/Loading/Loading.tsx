import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {LoadingProps} from './Loading.types';
import {colors} from '../../../constants';

const Loading: FC<LoadingProps> = ({
  containerStyle,
  color = colors.BLUE,
  ...props
}) => {
  return (
    <View style={[styles.loading_screen, containerStyle]}>
      <ActivityIndicator size="large" color={color} {...props} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading_screen: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
