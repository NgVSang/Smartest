import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {HistoryRegistryScreenProps} from './HistoryRegistryScreen.types';
import {ICar, IHistoryRegistry} from '../../types';
import {Header, HistoryRegistry} from '../../components';
import {styles} from './HistoryRegistryScreen.styled';
import {converLicensePlate} from '../../utils/string';
import {BASE_URL} from '../../config';
import {colors, fonts} from '../../constants';
import {CarApi} from '../../services/api/car.api';
import {RegistryApi} from '../../services/api';

const HistoryRegistryScreen: FC<HistoryRegistryScreenProps> = ({
  navigation,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [data, setData] = useState<IHistoryRegistry[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar>();
  const [listCar, setListCar] = useState<ICar[]>([]);

  const handleSelectCar = useCallback(async (car: ICar) => {
    setSelectedCar(car);
    setOpen(false);
    try {
      setIsLoading(true);
      const registries = await RegistryApi.getHistoryRegistries(
        car.license_plates,
      );
      if (registries.status === 1) {
        setData(registries.data);
      } else {
        //@ts-ignore
        throw new Error(registries.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderDropDown = useMemo(() => {
    if (selectedCar) {
      return (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setOpen(!open);
          }}>
          {selectedCar.display_image ? (
            <Image
              source={{
                uri: BASE_URL + selectedCar.display_image,
              }}
              style={styles.buttonStyle_img}
            />
          ) : (
            <View style={styles.nullImageWrapper}>
              <Text style={styles.nullText}>Chưa thêm ảnh</Text>
            </View>
          )}
          <Text style={[styles.buttonStyle_text, {}]}>
            {converLicensePlate(selectedCar.license_plates)}
          </Text>
        </TouchableOpacity>
      );
    }
    return <></>;
  }, [open, selectedCar]);

  const renderPicker = useMemo(
    () => (
      <Modal animationType="slide" visible={open}>
        <View style={styles.headerModalWrapper}>
          <Text style={styles.textStyled}>Chọn xe</Text>
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
            }}>
            <Image
              source={require('../../assets/icons/close-icon.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: colors.DARKER_BLUE,
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}>
          {listCar.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                handleSelectCar(item);
              }}
              style={styles.pickerWrapper}>
              {item.display_image ? (
                <Image
                  source={{
                    uri: BASE_URL + item.display_image,
                  }}
                  style={styles.buttonStyle_img}
                />
              ) : (
                <View style={styles.nullImageWrapper}>
                  <Text style={styles.nullText}>Chưa thêm ảnh</Text>
                </View>
              )}
              <Text style={styles.buttonStyle_text}>
                {converLicensePlate(item.license_plates)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    ),
    [listCar, open, handleSelectCar],
  );

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await CarApi.getListCar();
      if (res.status === 1) {
        setListCar(res.data.rows);
        if (res.data.rows.length > 0) {
          setSelectedCar(res.data.rows[0]);
          const registries = await RegistryApi.getHistoryRegistries(
            res.data.rows[0].license_plates,
          );
          if (registries.status === 1) {
            setData(registries.data);
          } else {
            //@ts-ignore
            throw new Error(registries.message);
          }
        }
      } else {
        //@ts-ignore
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Header title="Lịch sử đăng kiểm xe" />
      {renderDropDown}
      {renderPicker}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        {data.map(registry => (
          <HistoryRegistry
            data={registry}
            key={registry.id}
            onPress={() => {
              if (selectedCar)
                navigation.push('HistoryRegistryDetail', {
                  id: registry.id,
                  car: selectedCar,
                });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HistoryRegistryScreen;
