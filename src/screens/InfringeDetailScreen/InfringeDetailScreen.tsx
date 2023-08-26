import {RefreshControl, ScrollView, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {InfringeDetailScreenProps} from './InfringeDetailScreen.types';
import {Header, Infringe} from '../../components';
import {CarApi} from '../../services/api/car.api';
import {reConvertLicensePlate} from '../../utils/string';
import {IInfringe} from '../../types';
import {styles} from './InfringeDetailScreen.styled';

const InfringeDetailScreen: FC<InfringeDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {search} = route.params;
  const [data, setData] = React.useState<IInfringe[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [total, setTotal] = useState(0);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await CarApi.getInfringeByLicensePlate(
        reConvertLicensePlate(search),
      );
      if (res.status === 1) {
        setData(res.data.rows);
        setTotal(res.data.recordsTotal);
      } else {
        throw new Error('');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={`Tra cứu lỗi - ${search}`} />
      <View style={styles.page_content}>
        <View style={styles.car_infor}>
          <View style={styles.car_infor_left}>
            <Text style={styles.car_infor_title}>Biển kiểm soát</Text>
            <Text style={styles.license_plates_style}>{search}</Text>
          </View>
          <View style={styles.car_infor_right}>
            <Text style={styles.car_infor_title}>Số lỗi</Text>
            <Text style={styles.number_error}>{total}</Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
          }>
          {data.map(infringe => (
            <Infringe data={infringe} key={infringe.id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default InfringeDetailScreen;
