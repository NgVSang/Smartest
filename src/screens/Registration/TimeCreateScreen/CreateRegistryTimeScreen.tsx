import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {CreateRegistryTimeScreenProps} from './CreateRegistryTimeScreen.types';
import {DateInput, Footer, Header, SelecteInput} from '../../../components';
import {styles} from './CreateRegistryTimeScreen.styled';
import {ErrorMessage, Field, FieldProps, Formik} from 'formik';
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
      if (res.status === 1) {
        setRequired(res.data.profile);
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

  return (
    <View style={{flex: 1}}>
      <Header title="Đăng ký đăng kiểm" />
      <Formik
        initialValues={{
          car: carId || '',
          time: '',
          date: '',
        }}
        validationSchema={RegistryTimeSchema}
        onSubmit={handleSubmit}>
        {({handleSubmit, setValues, values}) => (
          <>
            <ScrollView style={styles.scroll_view}>
              <View style={styles.input_group}>
                <Field name="car">
                  {({field, form}: FieldProps) => (
                    <View style={styles.input_style}>
                      <SelecteInput
                        items={carOptions}
                        label="Loại phương tiện theo phí đường bộ"
                        value={field.value}
                        setValues={item => {
                          field.onChange(field.name)(item.id.toString());
                        }}
                      />
                      <View style={styles.error_message}>
                        <ErrorMessage
                          name={field.name}
                          render={(errorMessage: string) => (
                            <Text style={{color: colors.RED}}>
                              {errorMessage}
                            </Text>
                          )}
                        />
                      </View>
                    </View>
                  )}
                </Field>
                <View
                  style={[styles.input_style, {flexDirection: 'row', gap: 15}]}>
                  <Field name="date">
                    {({field, form}: FieldProps) => (
                      <View style={styles.input_picker}>
                        <DateInput
                          date={field.value}
                          label="Ngày đăng ký"
                          onChangeDate={field.onChange(field.name)}
                          onBlur={form.handleBlur(field.name)}
                        />
                        <View style={styles.error_message}>
                          <ErrorMessage
                            name={field.name}
                            render={(errorMessage: string) => (
                              <Text style={{color: colors.RED}}>
                                {errorMessage}
                              </Text>
                            )}
                          />
                        </View>
                      </View>
                    )}
                  </Field>
                  <Field name="time">
                    {({field, form}: FieldProps) => (
                      <View style={styles.input_picker}>
                        <DateInput
                          date={field.value}
                          label="Giờ đăng ký"
                          onChangeDate={field.onChange(field.name)}
                          placeholder="hh:mm"
                          option={{
                            format: 'hh:mm',
                          }}
                          onBlur={form.handleBlur(field.name)}
                        />
                        <View style={styles.error_message}>
                          <ErrorMessage
                            name={field.name}
                            render={(errorMessage: string) => (
                              <Text style={{color: colors.RED}}>
                                {errorMessage}
                              </Text>
                            )}
                          />
                        </View>
                      </View>
                    )}
                  </Field>
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
              onClickButtonOk={handleSubmit}
              buttonCancelContent="HỦY"
              style={styles.footer_style}
              loading={loadingSubmit}
              disabled={loadingSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateRegistryTimeScreen;
