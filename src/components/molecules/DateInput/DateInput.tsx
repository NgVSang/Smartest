import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {DateInputProps} from './DateInput.types';
import {styles} from './DateInput.styled';
import {TextInputMask} from 'react-native-masked-text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {convertDate} from '../../../utils/string';

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
  onPressCalendar,
  mode = 'date',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const handelChangeDate = useCallback(
    (date: string, rawText?: string) => {
      if (onChangeDate) onChangeDate(date);
    },
    [onChangeDate],
  );

  const handleSelectedDate = useCallback(
    (date: Date) => {
      if (onChangeDate) {
        if (mode === 'date') {
          onChangeDate(dayjs(date).format('DD/MM/YYYY'));
        }
        if (mode === 'time') {
          onChangeDate(dayjs(date).format('hh:mm'));
        }
      }
      setOpen(false);
    },
    [onChangeDate, mode],
  );

  const hideCalendar = useCallback(() => {
    setOpen(false);
  }, []);

  const handlePressCalendar = useCallback(() => {
    setOpen(true);
    // if (onPressCalendar) onPressCalendar();
  }, [onPressCalendar]);

  console.log(open);

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
          onPress={handlePressCalendar}>
          <Image
            source={require('../../../assets/icons/calendar_icon.png')}
            style={styles.icon_style}
          />
        </TouchableOpacity>
      )}
      <DateTimePickerModal
        isVisible={open}
        mode={mode}
        onConfirm={handleSelectedDate}
        onCancel={hideCalendar}
      />
    </View>
  );
};

export default DateInput;
