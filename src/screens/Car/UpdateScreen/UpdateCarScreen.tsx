/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {UpdateCarScreenProps} from './UpdateCarScreen.types';
import {Footer, Header, Loading, SelecteInput} from '../../../components';
import {styles} from './UpdateCarScreen.styled';
import {Field, FieldProps, Formik} from 'formik';
import {TextInputMask} from 'react-native-masked-text';
import {IFormData} from '../../../types';
import {DropDownItem} from '../../../components/molecules/SelecteInput/SelecteInput.types';
import {CarApi} from '../../../services/api/car.api';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {converLicensePlate, reConvertLicensePlate} from '../../../utils/string';
import {BASE_URL} from '../../../config';
import Toast from 'react-native-toast-message';

const UpdateCarScreen: FC<UpdateCarScreenProps> = ({navigation, route}) => {
  const {id, data} = route.params;
  const [photos, setPhotos] = useState<Asset[]>([]);

  const [categories, setCategories] = useState<DropDownItem[]>([]);
  const [types, setTypes] = useState<DropDownItem[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [images, setImages] = useState(data.display_images);
  const [arrDelete, setArrDelete] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        setLoadingSubmit(true);
        const formData = {
          license_plate: reConvertLicensePlate(data.licensePlates),
          manufacture_at: data.manufacture_at,
          type: data.type,
          photos: photos,
          delete: arrDelete,
        };
        console.log(formData);
        const res = await CarApi.updateCarById(id, formData);
        if (res.status === 1) {
          Toast.show({
            type: 'success',
            text1: 'Cập nhập thành công!',
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
          text1: 'Cập nhập không thành công!',
          text2: error.message || 'Vui lòng thử lại.',
        });
      } finally {
        setLoadingSubmit(false);
      }
    },
    [photos, arrDelete, id, navigation],
  );

  const handleGetCarCategories = useCallback(async () => {
    try {
      const res = await CarApi.getCarCategory();
      if (res.status === 1) {
        setCategories(res.data.rows);
      }
    } catch (error: any) {}
  }, []);

  const handleDeleteImage = useCallback(
    (item: Asset) => {
      const data = photos.filter(photo => photo !== item);
      setPhotos(data);
    },
    [photos],
  );

  const handleAddImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result.assets) {
      setPhotos([...photos, ...result.assets]);
    }
  }, [photos]);

  const handleGetCarTypes = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      const res = await CarApi.getCarType(id);
      if (res.status === 1) {
        setTypes(res.data.rows);
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteCurrentImage = useCallback(
    (id: number) => {
      const arr = images.filter(image => image.id !== id);
      setImages(arr);
      setArrDelete([...arrDelete, id]);
    },
    [images, arrDelete],
  );

  useEffect(() => {
    handleGetCarCategories();
    handleGetCarTypes(data.category.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Sửa thông tin xe" />
      <Formik
        initialValues={{
          licensePlates: converLicensePlate(data.license_plate),
          category: data.category.id.toString(),
          type: data.type.id.toString(),
          manufacture_at: data.manufacture_at,
        }}
        onSubmit={handleSubmit}>
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
                  {({field}: FieldProps) => (
                    <SelecteInput
                      items={categories}
                      style={styles.inputWrapper}
                      label="Loại phương tiện theo phí kiểm định"
                      value={field.value}
                      search
                      setValues={item => {
                        setValues({
                          ...values,
                          category: item.id.toString(),
                          type: '',
                        });
                        handleGetCarTypes(parseInt(item.id.toString(), 10));
                      }}
                    />
                  )}
                </Field>
                <Field name="type">
                  {({field}: FieldProps) => (
                    <SelecteInput
                      items={types}
                      style={styles.inputWrapper}
                      search
                      label="Loại phương tiện theo phí đường bộ"
                      value={field.value}
                      setValues={item => {
                        field.onChange(field.name)(item.id.toString());
                      }}
                    />
                  )}
                </Field>
                <Field name="manufacture_at">
                  {({field}: FieldProps) => (
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
                  {images.map((image, index) => (
                    <View
                      style={styles.photo_group_items}
                      key={image.id || index}>
                      <Image
                        source={{uri: BASE_URL + image.url}}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 3,
                          resizeMode: 'cover',
                        }}
                      />
                      <TouchableOpacity
                        style={styles.btn_delete}
                        onPress={() => {
                          handleDeleteCurrentImage(image.id);
                        }}>
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
      {isLoading && (
        <View style={styles.loading}>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default UpdateCarScreen;
