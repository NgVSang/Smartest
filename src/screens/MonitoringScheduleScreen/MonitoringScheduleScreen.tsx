import {RefreshControl, ScrollView, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {MonitoringScheduleScreenProps} from './MonitoringScheduleScreen.types';
import {RegistryApi} from '../../services/api';
import {Header, Registry} from '../../components';
import {IRegistration} from '../../types';
import {styles} from './MonitoringScheduleScreen.styled';
import dayjs from 'dayjs';
import {fonts} from '../../constants';

const MonitoringScheduleScreen: FC<MonitoringScheduleScreenProps> = ({
  navigation,
  route,
}) => {
  const {date} = route.params;
  const [data, setData] = useState<IRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      setData([]);
      const res = await RegistryApi.getRegistriesByDate(date);
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
  }, [date]);

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Lịch theo dõi" />
      <ScrollView
        style={{flex: 1, backgroundColor: '#F7FAFF'}}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        <View style={styles.content}>
          <Text style={styles.content_title}>
            {dayjs(date).day() === 0
              ? 'Chủ nhật'
              : 'Thứ ' + (dayjs(date).day() + 1)}
            , ngày {dayjs(date).format('DD/MM/YYYY')}
          </Text>
          {!isLoading && data.length === 0 && (
            <Text style={styles.nullText}>Hôm nay không có lịch đăng kiểm</Text>
          )}
          {data.map(registration => (
            <Registry
              key={registration.id}
              data={registration}
              style={styles.box_style}
              onPress={() => {
                navigation.push('RegistryDetail', {
                  id: registration.id,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MonitoringScheduleScreen;
