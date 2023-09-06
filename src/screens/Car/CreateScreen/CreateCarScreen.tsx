import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {CreateCarScreenProps} from './CreateCarScreen.types';
import {Footer, Header, SelecteInput} from '../../../components';
import {styles} from './CreateCarScreen.styled';
import {Field, FieldProps, Formik} from 'formik';
import {IFormData} from '../../../types';
import {
  launchImageLibrary,
  launchCamera,
  Asset,
} from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';
import {DropDownItem} from '../../../components/molecules/SelecteInput/SelecteInput.types';
import {CarApi} from '../../../services/api/car.api';
import {reConvertLicensePlate} from '../../../utils/string';
import Toast from 'react-native-toast-message';

const CreateCarScreen: FC<CreateCarScreenProps> = ({navigation}) => {
  const [photos, setPhotos] = useState<Asset[]>([]);

  const [categories, setCategories] = useState<DropDownItem[]>([]);
  const [types, setTypes] = useState<DropDownItem[]>([]);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  function check(text: string) {
    return /[a-zA-Z]/.test(text[3]);
  }

  const listYear = useMemo(() => {
    const current_year = new Date().getFullYear();
    const data = [];
    for (let i = current_year; i >= 1900; i--) {
      data.push({
        id: i,
        name: i,
      });
    }
    return data;
  }, []);

  const handleAddImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.assets) {
      setPhotos([...photos, ...result.assets]);
    }
  }, [photos]);

  const handleDeleteImage = useCallback(
    (item: Asset) => {
      const data = photos.filter(photo => photo !== item);
      setPhotos(data);
    },
    [photos],
  );

  const handleGetCarCategories = useCallback(async () => {
    try {
      const res = await CarApi.getCarCategory();
      if (res.status === 1) {
        setCategories(res.data.rows);
      }
    } catch (error: any) {}
  }, []);

  const handleGetCarTypes = useCallback(async (id: number | string) => {
    try {
      const res = await CarApi.getCarType(id);
      if (res.status === 1) {
        setTypes(res.data.rows);
      }
    } catch (error: any) {}
  }, []);

  useEffect(() => {
    handleGetCarCategories();
  }, []);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        setLoadingSubmit(true);
        const formData = {
          license_plate: reConvertLicensePlate(data.licensePlates),
          manufacture_at: data.manufacture_at,
          type: data.type,
          photos: photos,
        };
        const res = await CarApi.createCar(formData);
        if (res.status === 1) {
          Toast.show({
            type: 'success',
            text1: 'Tạo thành công!',
          });
          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'Bottom',
              },
              {
                name: 'CarList',
              },
            ],
          });
        } else {
          //@ts-ignore
          throw new Error(res.message);
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Tạo không thành công!',
          text2: error.message || 'Vui lòng thử lại.',
        });
      } finally {
        setLoadingSubmit(false);
      }
    },
    [photos],
  );

  return (
    <View style={{flex: 1}}>
      <Header title="Thêm thông tin xe" />
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({handleSubmit, setValues, values}) => (
          <>
            <ScrollView style={styles.scroll_view}>
              <View style={styles.input_group}>
                <Field name="licensePlates">
                  {({field, form}: FieldProps) => (
                    <View style={styles.inputWrapper}>
                      <Text style={styles.label_style}>
                        Biển số xe (Vui lòng nhập liền không dấu, không cách)
                      </Text>
                      <TextInputMask
                        type={'custom'}
                        options={{
                          mask: check(field.value || '')
                            ? '99AS - 99999999999999'
                            : '99A - 999999999999999',
                        }}
                        autoCapitalize={'characters'}
                        value={field.value}
                        style={styles.input_style}
                        onBlur={form.handleBlur(field.name)}
                        onChangeText={field.onChange(field.name)}
                        placeholder="Ví dụ: 43D - 24232"
                      />
                    </View>
                  )}
                </Field>
                <Field name="category">
                  {({field, form}: FieldProps) => (
                    <SelecteInput
                      items={categories}
                      style={styles.inputWrapper}
                      label="Loại phương tiện theo phí kiểm định"
                      value={field.value}
                      setValues={item => {
                        setValues({
                          ...values,
                          category: item.id.toString(),
                          type: '',
                        });
                        handleGetCarTypes(item.id);
                      }}
                    />
                  )}
                </Field>
                <Field name="type">
                  {({field, form}: FieldProps) => (
                    <SelecteInput
                      items={types}
                      style={styles.inputWrapper}
                      label="Loại phương tiện theo phí đường bộ"
                      value={field.value}
                      setValues={item => {
                        field.onChange(field.name)(item.id.toString());
                      }}
                    />
                  )}
                </Field>
                <Field name="manufacture_at">
                  {({field, form}: FieldProps) => (
                    <SelecteInput
                      items={listYear}
                      style={styles.inputWrapper}
                      label="Năm sản xuất"
                      value={field.value}
                      setValues={item => {
                        field.onChange(field.name)(item.id.toString());
                      }}
                    />
                  )}
                </Field>
              </View>
              <View style={styles.photo}>
                <Text style={styles.photo_title}>Hình ảnh</Text>
                <View style={styles.photo_group}>
                  {photos.map((image, index) => (
                    <View
                      style={styles.photo_group_items}
                      key={image.id || index}>
                      <Image
                        source={{uri: image.uri}}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 3,
                          resizeMode: 'cover',
                        }}
                      />
                      <TouchableOpacity
                        style={styles.btn_delete}
                        onPress={() => handleDeleteImage(image)}>
                        <Image
                          source={require('../../../assets/icons/delete_icon.png')}
                          style={{
                            width: 14,
                            height: 14,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.btn_add}
                    onPress={handleAddImage}>
                    <Image
                      source={require('../../../assets/icons/add_photo_icon.png')}
                      style={{
                        width: 16,
                        height: 16,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <Footer
              buttonOkContent="LƯU"
              style={styles.footer_style}
              onClickButtonOk={handleSubmit}
              loading={loadingSubmit}
              disabled={loadingSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default CreateCarScreen;
