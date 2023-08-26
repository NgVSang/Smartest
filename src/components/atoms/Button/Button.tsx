import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import React, {FC, useCallback} from 'react';
import {styles} from './Button.styled';
import {ButtonProps} from './Button.types';
import {colors} from '../../../constants';

const Button: FC<ButtonProps> = ({
  title,
  titleStyle,
  style,
  loading = false,
  loadingStyle,
  loadingColor = colors.WHITE,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      {loading && (
        <ActivityIndicator
          color={loadingColor}
          style={[styles.loading, loadingStyle]}
        />
      )}
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
