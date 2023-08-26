import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';
import {CarDetailScreenProps} from './CarDetailScreen.types';
import {ICarDetail} from '../../../types';
import {CarApi} from '../../../services/api/car.api';
import {Footer, Header} from '../../../components';
import {styles} from './CarDetailScreen.styled';
import {converLicensePlate} from '../../../utils/string';
import {BASE_URL} from '../../../config';
import {useDispatch} from 'react-redux';
import {openModal} from '../../../redux';
import Toast from 'react-native-toast-message';

const CarDetailScreen: FC<CarDetailScreenProps> = ({navigation, route}) => {
  const {id} = route.params;

  const [data, setData] = React.useState<ICarDetail>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await CarApi.getCarById(id);
      if (res.status === 1) {
        setData(res.data);
      } else {
        //@ts-ignore
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleDelete = useCallback(() => {
    Alert.alert('Xóa thông tin xe', 'Bạn có chắc muốn xóa không?', [
      {
        text: 'Hủy',
      },
      {
        text: 'Ok',
        onPress: async () => {
          try {
            setLoadingSubmit(true);
            const res = await CarApi.deleteCarById(id);
            if (res.status === 1) {
              Toast.show({
                type: 'success',
                text1: 'Xóa xe thành công',
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
            console.log(error.message);
            Toast.show({
              type: 'error',
              text1: 'Xóa không thành công',
              text2: error.message || 'Vui lòng thử lại ',
            });
          } finally {
            setLoadingSubmit(false);
          }
        },
      },
    ]);
  }, [id]);

  return (
    <View style={{flex: 1}}>
      <Header title="Xem thông tin xe" />
      <ScrollView
        style={styles.scroll_view}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        <View style={styles.group}>
          <Text style={styles.group_title}>Biển số xe</Text>
          <Text style={styles.group_content}>
            {converLicensePlate(data?.license_plates)}
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.group_title}>Chủng loại phương tiện</Text>
          <Text style={styles.group_content}>{data?.category.name}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.group_title}>Loại phương tiện</Text>
          <Text style={styles.group_content}>{data?.type.name}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.group_title}>Năm sản xuất</Text>
          <Text style={styles.group_content}>{data?.manufacture_at}</Text>
        </View>
        <View style={styles.photo}>
          <Text style={styles.photo_title}>Hình ảnh</Text>
          <View style={styles.photo_group}>
            {data?.display_images.map((image, index) => (
              <Image
                key={index}
                source={{uri: BASE_URL + image.url}}
                style={styles.photo_style}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer
        buttonOkContent={'Cập nhật'}
        onClickButtonOk={() => {}}
        buttonCancelContent="XÓA"
        onClickButtonCancel={handleDelete}
        style={{
          backgroundColor: '#FFFFFF',
        }}
        disabled={loadingSubmit}
      />
    </View>
  );
};

export default CarDetailScreen;
