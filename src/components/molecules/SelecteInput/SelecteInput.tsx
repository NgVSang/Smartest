import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {DropDownItem, SelecteInputProps} from './SelecteInput.types';
import {styles} from './SelecteInput.styled';
import {colors} from '../../../constants';

const SelecteInput: FC<SelecteInputProps> = ({
  items,
  placeholder = '- Chọn -',
  label = '',
  setValues,
  dropdownStyle,
  value,
  ...props
}) => {
  const selectedValue = useMemo(() => {
    const selected = items.filter(item => item.id === parseInt(value || '0'));
    if (selected.length > 0) {
      return selected[0];
    }
  }, [value, items]);

  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (data: DropDownItem) => {
      if (setValues) {
        setValues(data);
      }
      setOpen(false);
    },
    [setValues],
  );
  const renderPicker = useMemo(
    () => (
      <Modal animationType="slide" visible={open}>
        <View style={styles.headerModalWrapper}>
          <Text style={styles.textStyled}>{label}</Text>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
            }}>
            <Image
              source={require('../../../assets/icons/close-icon.png')}
              style={{
                width: 16,
                height: 16,
                tintColor: colors.DARKER_BLUE,
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                handleSelect(item);
              }}
              style={styles.pickerWrapper}>
              <Text style={styles.buttonStyle_text}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    ),
    [label, open, handleSelect],
  );

  return (
    <View {...props}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)}>
        <Text>{selectedValue ? selectedValue.name : placeholder}</Text>
      </TouchableOpacity>
      {renderPicker}
    </View>
  );
};

export default SelecteInput;
