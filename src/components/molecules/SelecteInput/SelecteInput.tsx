/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {DropDownItem, SelecteInputProps} from './SelecteInput.types';
import {styles} from './SelecteInput.styled';
import {colors, fonts} from '../../../constants';

const SelecteInput: FC<SelecteInputProps> = ({
  items,
  placeholder = '- Chọn -',
  label = '',
  setValues,
  nullText = 'Không có dữ liệu',
  value,
  dropdownStyle,
  search = false,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState(items);

  const selectedValue = useMemo(() => {
    const selected = items.filter(
      item => item.id === parseInt(value || '0', 10),
    );
    if (selected.length > 0) {
      return selected[0];
    }
  }, [value, items]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOptions(items);
  }, [items]);

  const handleSelect = useCallback(
    (data: DropDownItem) => {
      if (setValues) {
        setValues(data);
      }
      setOpen(false);
    },
    [setValues],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setSearchValue(text);
      const searchTermLowerCase = text.toLowerCase();
      const newData = items.filter(item =>
        item.name.toString().toLowerCase().includes(searchTermLowerCase),
      );
      setOptions(newData);
    },
    [items],
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
        {search && (
          <View style={styles.searchWrapper}>
            <Image
              source={require('../../../assets/icons/search_icon.png')}
              style={{
                width: 14,
                height: 14,
              }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              placeholderTextColor={colors.SLATE_GRAY}
              onChangeText={handleSearch}
              value={searchValue}
            />
          </View>
        )}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {options.length === 0 && (
            <Text style={styles.nullText}>{nullText}</Text>
          )}
          {options.map(item => (
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
    [
      open,
      label,
      search,
      handleSearch,
      searchValue,
      nullText,
      handleSelect,
      options,
    ],
  );

  return (
    <View {...props}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdown, dropdownStyle]}
        onPress={() => setOpen(!open)}>
        <Text
          style={{
            fontFamily: fonts.BE_VIETNAM_PRO_SEMIBOLD,
            fontSize: 14,
            fontWeight: '600',
            color: '#2C3442',
          }}>
          {selectedValue ? selectedValue.name : placeholder}
        </Text>
      </TouchableOpacity>
      {renderPicker}
    </View>
  );
};

export default SelecteInput;
