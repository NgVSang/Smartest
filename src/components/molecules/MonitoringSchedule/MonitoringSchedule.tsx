import {Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {MonitoringScheduleProps} from './MonitoringSchedule.types';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {styles} from './MonitoringSchedule.styled';
import {colors} from '../../../constants';
import {RegistryApi} from '../../../services/api';
import {MarkedDates} from 'react-native-calendars/src/types';
import {NavigationService} from '../../../services/navigation';

LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vn';

type DateMarker = {
  date: string;
};

const MonitoringSchedule: FC<MonitoringScheduleProps> = ({containerStyle}) => {
  const [dateMarker, setDateMarker] = useState<DateMarker[]>();

  const getListDateRegistry = async () => {
    try {
      const res = await RegistryApi.getFutureRegistries();
      //@ts-ignore
      if (res.status === 0) throw new Error(res.message);
      setDateMarker(res.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListDateRegistry();
  }, []);

  const markedDates = useMemo(() => {
    let dates: MarkedDates = {};
    if (dateMarker) {
      for (let i = 0; i < dateMarker.length; i++) {
        const date = dateMarker[i];
        let obj = {
          [date.date]: {marked: true},
        };
        dates = Object.assign({}, obj, dates);
      }
    }
    return dates;
  }, [dateMarker]);

  return (
    <View style={[styles.group, containerStyle]}>
      <Text style={styles.title}>Lịch theo dõi</Text>
      <Calendar
        scrollEnabled={true}
        onDayPress={day => {
          NavigationService.push<'MonitoringSchedule'>('MonitoringSchedule', {
            date: day.dateString,
          });
        }}
        enableSwipeMonths={true}
        firstDay={1}
        showScrollIndicator={true}
        markedDates={markedDates}
        renderHeader={date => {
          return (
            <TouchableOpacity onPress={() => console.log('calender')}>
              <Text style={styles.calender_title_style}>
                Tháng {date.getMonth() + 1}/{date.getFullYear()}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={styles.calender_style}
        theme={{
          dotColor: colors.RED,
          todayBackgroundColor: colors.GREEN,
          todayTextColor: colors.WHITE,
          todayDotColor: colors.WHITE,
        }}
      />
      <View style={styles.decription}>
        <View style={styles.decription_group}>
          <View
            style={[
              styles.decription_btn,
              {backgroundColor: '#00B94A'},
            ]}></View>
          <Text style={styles.decription_content}>Ngày hiện tại</Text>
        </View>
        <View style={styles.decription_group}>
          <View
            style={[
              styles.decription_btn,
              {backgroundColor: colors.RED},
            ]}></View>
          <Text style={styles.decription_content}>
            Kế hoạch đăng kiểm tương lai
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MonitoringSchedule;
