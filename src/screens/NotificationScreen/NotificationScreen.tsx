import {
  NativeScrollEvent,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {NotificationScreenProps} from './NotificationScreen.types';
import {NotificationApi} from '../../services/api';
import {INotice} from '../../types';
import {Header, Loading, Notification} from '../../components';
import {styles} from './NotificationScreen.styled';
import {useDispatch} from 'react-redux';
import {setStatusNotification} from '../../redux';

const NotificationScreen: FC<NotificationScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [page, setPage] = React.useState<number>(1);
  const [total, setTotal] = React.useState<number>(10);
  const [data, setData] = React.useState<INotice[]>([]);

  const handleGetStatusNotification = useCallback(async () => {
    try {
      const res = await NotificationApi.updateNotificationStatus();
      if (res.status === 1) {
        dispatch(setStatusNotification(false));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleGetNotifications = async () => {
    try {
      setIsLoading(true);
      const res = await NotificationApi.getListNotification();
      // console.log(res.data);
      setData(res.data.rows);
      setTotal(res.data.recordsTotal);
      setPage(2);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadmore = async () => {
    if (total === 10) {
      setIsLoadMore(true);
      try {
        console.log(page);
        const res = await NotificationApi.getListNotification(10, page);
        if (res.status === 1) {
          setPage(page + 1);
          setTotal(res.data.recordsTotal);
          setData([...data, ...res.data.rows]);
        } else {
          //@ts-ignore
          throw new Error(res.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadMore(false);
      }
    }
  };

  useEffect(() => {
    handleGetNotifications();
    handleGetStatusNotification();
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return (
      layoutMeasurement.height + contentOffset.y + 20 >= contentSize.height
    );
  };
  return (
    <View style={styles.screen}>
      <Header showBtnGoback={false} title="Thông báo" />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent) && !isLoadMore) {
            handleLoadmore();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleGetNotifications}
          />
        }>
        <View>
          {data.map((notice, index) => (
            <Notification data={notice} key={index} />
          ))}
          {isLoadMore && <Loading />}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
