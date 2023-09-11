import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {BottomNavigate} from './types';
import {HomeScreen, HotlineScreen, NotificationScreen} from '../screens';
import {colors, fonts} from '../constants';
import {TabBottomItem} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, setStatusNotification} from '../redux';

const Tab = createBottomTabNavigator<BottomNavigate>();

const BottomNavigattion: FC = () => {
  const {haveNotices} = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: props => (
            <Text
              style={[
                styles.tabBarText,
                {
                  color: props.focused ? colors.BLUE : colors.DARK_BLUE,
                },
              ]}>
              TRANG CHỦ
            </Text>
          ),
          tabBarIcon: props => (
            <TabBottomItem
              props={props}
              icon={require('../assets/icons/home_icon.png')}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          tabBarLabel: props => (
            <Text
              style={[
                styles.tabBarText,
                {
                  color: props.focused ? colors.BLUE : colors.DARK_BLUE,
                },
              ]}>
              THÔNG BÁO
            </Text>
          ),
          tabBarIcon: props => (
            <TabBottomItem
              props={props}
              icon={require('../assets/icons/notification_icon.png')}
            />
          ),
          headerShown: false,
          tabBarBadge: haveNotices ? '' : undefined,
        }}
        listeners={{
          tabPress: () => {
            dispatch(setStatusNotification(false));
          },
        }}
      />
      <Tab.Screen
        name="Hotline"
        component={HotlineScreen}
        options={{
          tabBarLabel: props => (
            <Text
              style={[
                styles.tabBarText,
                {
                  color: props.focused ? colors.BLUE : colors.DARK_BLUE,
                },
              ]}>
              GỌI HOTLINE
            </Text>
          ),
          tabBarIcon: props => (
            <TabBottomItem
              props={props}
              icon={require('../assets/icons/phone_call_icon.png')}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigattion;

const styles = StyleSheet.create({
  iconProvider: {},
  icon: {},
  tabBarText: {
    fontFamily: fonts.BE_VIETNAM_PRO_MEDIUM,
    fontSize: 10,
  },
});
