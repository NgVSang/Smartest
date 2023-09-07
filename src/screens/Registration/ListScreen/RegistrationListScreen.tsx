import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {RegistrationListScreenProps} from './RegistrationListScreen.types';
import {IRegisGroup} from '../../../types';
import {RegistryApi} from '../../../services/api';
import {Footer, Header, Registry} from '../../../components';
import {styles} from './RegistrationListScreen.styled';
import dayjs from 'dayjs';

const RegistrationListScreen: FC<RegistrationListScreenProps> = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = useState<IRegisGroup[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      setData([]);
      const res = await RegistryApi.getListRegistries();
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
      <Header onGoback={() => {}} title="Danh sách đăng ký đăng kiểm" />
      <ScrollView
        style={styles.scroll_view}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
        }>
        {data.map((group, index) => (
          <View style={styles.group} key={index}>
            <Text style={styles.data_time}>
              {dayjs(group.date).format('DD/MM/YYYY')}
            </Text>
            <View>
              {group.list_registration.map(registration => (
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
          </View>
        ))}
      </ScrollView>
      <Footer
        buttonOkContent={'Tạo đăng kí mới'}
        onClickButtonOk={() => {
          navigation.push('CreateRegistryTime', {});
        }}
      />
    </View>
  );
};

export default RegistrationListScreen;
