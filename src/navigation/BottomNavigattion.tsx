import {Image, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {BottomNavigate} from './types';
import {HomeScreen, HotlineScreen, NotificationScreen} from '../screens';
import {colors, fonts} from '../constants';

const Tab = createBottomTabNavigator<BottomNavigate>();

interface TabItemProps {
  props: {
    focused: boolean;
    color: string;
    size: number;
  };
  icon: any;
}

const TabItem: FC<TabItemProps> = ({props, icon}) => {
  return (
    <View style={props.focused && styles.iconProvider}>
      <View style={props.focused && styles.icon}>
        <Image
          source={icon}
          style={{
            tintColor: props.focused ? colors.BLUE : colors.DARK_BLUE,
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};

const BottomNavigattion: FC = () => {
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
            <TabItem
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
            <TabItem
              props={props}
              icon={require('../assets/icons/notification_icon.png')}
            />
          ),
          headerShown: false,
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
            <TabItem
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
