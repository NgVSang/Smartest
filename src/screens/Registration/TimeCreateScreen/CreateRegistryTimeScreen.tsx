import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {CreateRegistryTimeScreenProps} from './CreateRegistryTimeScreen.types';
import {DateInput, Footer, Header, SelecteInput} from '../../../components';
import {styles} from './CreateRegistryTimeScreen.styled';
import {ErrorMessage, Field, FieldProps, Formik, useFormik} from 'formik';
import {ICar, IFormData, IRequired} from '../../../types';
import {CarApi} from '../../../services/api/car.api';
import {
  converLicensePlate,
  convertDate,
  reConvertLicensePlate,
} from '../../../utils/string';
import {colors, fonts} from '../../../constants';
import {RegistryApi} from '../../../services/api';
import Toast from 'react-native-toast-message';
import {RegistryTimeSchema} from '../../../services/validators';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

const CreateRegistryTimeScreen: FC<CreateRegistryTimeScreenProps> = ({
  navigation,
  route,
}) => {
  const carId = route.params?.carId;
  const [cars, setCars] = useState<ICar[]>([]);
  const [required, setRequired] = useState<IRequired[]>([]);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const handleGetData = useCallback(async () => {
    try {
      const res = await CarApi.getListCar();
      if (res.status === 1) {
        setCars(res.data.rows);
      } else {
        //@ts-ignore
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }, []);

  const carOptions = useMemo(
    () =>
      cars.map(car => {
        return {
          id: car.id,
          name: converLicensePlate(car.license_plates),
        };
      }),
    [cars],
  );

  const handelGetRequired = useCallback(async () => {
    try {
      const res = await CarApi.getListRequired();
      console.log(res.data);

      if (res.status === 1) {
        setRequired(res.data.profile);
        console.log(res.data);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    handleGetData();
    handelGetRequired();
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        setLoadingSubmit(true);
        const check = await RegistryApi.checkRegistry(data.car);
        if (check.data.isValid === true && check.status === 1) {
          const limit = await CarApi.getLimitVehiclesByDate(
            convertDate(data.date),
          );
          const licensePlate = reConvertLicensePlate(
            carOptions.filter(
              car => car.id.toString() === data.car.toString(),
            )[0].name,
          );
          if (limit.data.amount_registries >= limit.data.number_vehicles) {
            Alert.alert(
              'Cảnh báo!',
              'Khung giờ này hiện đang có nhiều đăng ký cùng lúc và có thể sẽ cần đợi xử lý lâu hơn',
              [
                {
                  text: 'Chọn lại',
                },
                {
                  text: 'Tiếp tục',
                  onPress: () => {
                    navigation.push('CreateRegistryInfor', {
                      car: {
                        id: data.car,
                        licensePlate: licensePlate,
                      },
                      date: convertDate(data.date),
                      time: data.time,
                    });
                  },
                },
              ],
            );
          } else {
            navigation.push('CreateRegistryInfor', {
              car: {
                id: data.car,
                licensePlate: licensePlate,
              },
              date: convertDate(data.date),
              time: data.time,
            });
          }
        } else {
          //@ts-ignore
          throw new Error(check.message);
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Đăng ký không thành công',
          text2: error.message || 'Vui lòng thử lại ',
        });
      } finally {
        setLoadingSubmit(false);
      }
    },
    [carOptions],
  );

  const formik = useFormik({
    initialValues: {
      car: carId || '',
      time: '',
      date: '',
    },
    onSubmit: handleSubmit,
    validationSchema: RegistryTimeSchema,
  });
  return (
    <View style={{flex: 1}}>
      <Header title="Đăng ký đăng kiểm" />
      <ScrollView style={styles.scroll_view}>
        <View style={styles.input_group}>
          <View style={styles.input_style}>
            <SelecteInput
              items={carOptions}
              label="Loại phương tiện theo phí đường bộ"
              value={formik.values.car}
              setValues={item => {
                formik.setFieldValue('car', item.id.toString());
              }}
            />
            {formik.errors.car && (
              <View style={styles.error_message}>
                <Text style={{color: colors.RED}}>{formik.errors.car}</Text>
              </View>
            )}
          </View>
          <View style={[styles.input_style, {flexDirection: 'row', gap: 15}]}>
            <View style={styles.input_picker}>
              <DateInput
                date={formik.values.date}
                label="Ngày đăng ký"
                onChangeDate={date => {
                  formik.setFieldValue('date', date);
                }}
                onBlur={formik.handleBlur('date')}
              />
              {formik.errors.date && (
                <View style={styles.error_message}>
                  <Text style={{color: colors.RED}}>{formik.errors.date}</Text>
                </View>
              )}
            </View>
            <View style={styles.input_picker}>
              <DateInput
                date={formik.values.time}
                label="Giờ đăng ký"
                onChangeDate={date => {
                  formik.setFieldValue('time', date);
                }}
                placeholder="hh:mm"
                option={{
                  format: 'hh:mm',
                }}
                onBlur={formik.handleBlur('time')}
                mode="time"
              />
              {formik.errors.time && (
                <View style={styles.error_message}>
                  <Text style={{color: colors.RED}}>{formik.errors.time}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.rule_group}>
          <Text
            style={{
              fontFamily: fonts.BE_VIETNAM_PRO_BOLD,
              color: '#2C3442',
              fontSize: 14,
              lineHeight: 22,
              fontWeight: '700',
              marginBottom: 15,
            }}>
            Khi đem xe đi đăng kiểm cần có:
          </Text>
          {required.map(e => (
            <View style={styles.rule_group_row} key={e.id}>
              <Image
                source={require('../../../assets/icons/required_check_icon.png')}
                style={styles.icon_check_style}
              />
              <Text style={styles.rule_content_style}>{e.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer
        buttonOkContent="TIẾP TỤC"
        onClickButtonOk={formik.handleSubmit}
        buttonCancelContent="HỦY"
        style={styles.footer_style}
        loading={loadingSubmit}
        disabled={loadingSubmit}
      />
    </View>
  );
};

export default CreateRegistryTimeScreen;
