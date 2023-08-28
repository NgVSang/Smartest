import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {CarListScreenProps} from './CarListScreen.types';
import {CarInformation, Footer, Header} from '../../../components';
import {styles} from './CarListScreen.styled';
import {CarApi} from '../../../services/api/car.api';
import {ICar} from '../../../types';

const CarListScreen: FC<CarListScreenProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = useState<ICar[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      setData([]);
      const res = await CarApi.getListCar();
      if (res.status === 1) {
        setData(res.data.rows);
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
    <View style={{flex: 1}}>
      <Header title="Danh sách đăng ký đăng kiểm" />
      <ScrollView
        style={styles.scroll_view}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        {data.map(car => (
          <CarInformation
            data={car}
            onPress={() => {
              navigation.push('CarDetail', {
                id: car.id,
              });
            }}
            key={car.id}
            style={{marginVertical: 10}}
          />
        ))}
      </ScrollView>
      <Footer
        buttonOkContent="Thêm thông tin xe"
        onClickButtonOk={() => {
          navigation.push('CreateCar');
        }}
      />
    </View>
  );
};

export default CarListScreen;
