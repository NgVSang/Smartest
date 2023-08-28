import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {CreateRegistryTimeScreenProps} from './CreateRegistryTimeScreen.types';
import {DateInput, Footer, Header, SelecteInput} from '../../../components';
import {styles} from './CreateRegistryTimeScreen.styled';
import {Field, FieldProps, Formik} from 'formik';
import {ICar, IFormData, IRequired} from '../../../types';
import {CarApi} from '../../../services/api/car.api';
import {converLicensePlate} from '../../../utils/string';
import {fonts} from '../../../constants';

const CreateRegistryTimeScreen: FC<CreateRegistryTimeScreenProps> = ({
  navigation,
  route,
}) => {
  const carId = route.params?.carId;
  const [cars, setCars] = useState<ICar[]>([]);
  const [required, setRequired] = useState<IRequired[]>([]);

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

  const handleSubmit = useCallback((data: IFormData) => {
    console.log(data);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Đăng ký đăng kiểm" />
      <Formik
        initialValues={{
          car: carId || '0',
        }}
        onSubmit={handleSubmit}>
        {({handleSubmit, setValues, values}) => (
          <>
            <ScrollView style={styles.scroll_view}>
              <View style={styles.input_group}>
                <Field name="car">
                  {({field, form}: FieldProps) => (
                    <SelecteInput
                      items={carOptions}
                      style={styles.input_style}
                      label="Loại phương tiện theo phí đường bộ"
                      value={field.value}
                      setValues={item => {
                        field.onChange(field.name)(item.id.toString());
                      }}
                    />
                  )}
                </Field>
                <View
                  style={[styles.input_style, {flexDirection: 'row', gap: 15}]}>
                  <Field name="date">
                    {({field, form}: FieldProps) => (
                      <DateInput
                        date={field.value}
                        label="Ngày đăng ký"
                        style={styles.input_picker}
                        onChangeDate={field.onChange(field.name)}
                      />
                    )}
                  </Field>
                  <Field name="time">
                    {({field, form}: FieldProps) => (
                      <DateInput
                        date={field.value}
                        label="Giờ đăng ký"
                        style={styles.input_picker}
                        onChangeDate={field.onChange(field.name)}
                        placeholder="hh:mm"
                        option={{
                          format: 'hh:mm',
                        }}
                      />
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
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateRegistryTimeScreen;
