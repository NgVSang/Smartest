import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {DateInputProps} from './DateInput.types';
import {styles} from './DateInput.styled';
import {TextInputMask} from 'react-native-masked-text';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

const DateInput: FC<DateInputProps> = ({
  date,
  label,
  onChangeDate,
  haveCalendar = true,
  placeholder = 'dd/mm/yyyy',
  style,
  option = {
    format: 'DD/MM/YYYY',
  },
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handelChangeDate = useCallback(
    (date: string, rawText?: string) => {
      if (onChangeDate) onChangeDate(date);
    },
    [onChangeDate],
  );

  return (
    <View style={style}>
      {label && <Text style={styles.label_style}>{label}</Text>}
      <TextInputMask
        value={date}
        options={option}
        onChangeText={handelChangeDate}
        style={styles.input_style}
        placeholder={placeholder}
        type="datetime"
        {...props}
      />
      {haveCalendar && (
        <TouchableOpacity
          style={styles.icon_position}
          onPress={() => {
            setOpen(true);
          }}>
          <Image
            source={require('../../../assets/icons/calendar_icon.png')}
            style={styles.icon_style}
          />
        </TouchableOpacity>
      )}
      {/* <DateTimePicker
        isVisible={open}
        onCancel={() => setOpen(false)}
        onConfirm={date => {
          handelChangeDate(dayjs(date).format('YYYY-MM-DD'));
        }}
        date={new Date(date || '')}
      /> */}
    </View>
  );
};

export default DateInput;
