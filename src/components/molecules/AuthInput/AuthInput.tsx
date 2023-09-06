import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {styles} from './AuthInput.styled';
import {AuthInputProps} from './AuthInput.types';
import {ErrorMessage} from 'formik';
import {colors} from '../../../constants';

const AuthInput: FC<AuthInputProps> = ({
  field,
  form,
  title,
  keyboardType,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  if (keyboardType === 'visible-password') {
    return (
      <View style={styles.group}>
        <View style={styles.boxInput}>
          {title && <Text style={styles.textLabel}>{title}</Text>}
          <TextInput
            value={field.value}
            onChangeText={field.onChange(field.name)}
            onBlur={form.handleBlur(field.name)}
            placeholderTextColor={colors.LIGHT_BLUE_GRAY}
            style={[styles.inputType, styles.inputContainer]}
            {...props}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}>
            <Image
              source={
                passwordVisible
                  ? require('../../../assets/icons/unvisible_eye_icon.png')
                  : require('../../../assets/icons/visible_eye_icon.png')
              }
              style={styles.icon_style}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.error_message}>
          <ErrorMessage
            name={field.name}
            render={(errorMessage: string) => (
              <Text style={{color: colors.RED}}>{errorMessage}</Text>
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.group}>
      <View style={styles.boxInput}>
        {title && <Text style={styles.textLabel}>{title}</Text>}
        <TextInput
          value={field.value}
          onChangeText={field.onChange(field.name)}
          onBlur={form.handleBlur(field.name)}
          placeholderTextColor={colors.LIGHT_BLUE_GRAY}
          style={[styles.inputType, styles.inputContainer]}
          keyboardType={keyboardType}
          {...props}
        />
      </View>
      <View style={styles.error_message}>
        <ErrorMessage
          name={field.name}
          render={(errorMessage: string) => (
            <Text style={{color: colors.RED}}>{errorMessage}</Text>
          )}
        />
      </View>
    </View>
  );
};

export default AuthInput;
