import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {FooterProps} from './Footer.types';
import {styles} from './Footer.styled';
import {Button} from '../../atoms';
import {colors} from '../../../constants';
import {NavigationService} from '../../../services/navigation';

const Footer: FC<FooterProps> = ({
  buttonOkContent,
  buttonCancelContent,
  disabled,
  loading,
  onClickButtonCancel,
  onClickButtonOk,
  style,
}) => {
  const handleCancel = useCallback(() => {
    if (onClickButtonCancel) {
      onClickButtonCancel();
    } else {
      NavigationService.pop();
    }
  }, [onClickButtonCancel]);

  return (
    <View style={[styles.footer, style]}>
      {buttonCancelContent && (
        <Button
          title={buttonCancelContent}
          onPress={handleCancel}
          style={[styles.cancel_btn]}
          disabled={disabled}
          titleStyle={{...styles.footer_text, color: colors.DARKER_BLUE}}
        />
      )}
      <Button
        title={buttonOkContent}
        onPress={onClickButtonOk}
        loading={loading}
        disabled={disabled}
        style={styles.footer_btn}
        titleStyle={styles.footer_text}
      />
    </View>
  );
};

export default Footer;
