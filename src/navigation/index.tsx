import React, {FC, useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthScreen,
  CarDetailScreen,
  CarListScreen,
  CreateCarScreen,
  CreateRegistryInforScreen,
  CreateRegistryTimeScreen,
  HistoryRegistryDetailScreen,
  HistoryRegistryScreen,
  InfringeDetailScreen,
  InfringeScreen,
  ProfileScreen,
  RegistrationDetailScreen,
  RegistrationListScreen,
  UpdateCarScreen,
} from '../screens';
import BottomNavigattion from './BottomNavigattion';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux';
import {NavigationService} from '../services/navigation';
import {setHeaderConfigAxios} from '../services/api';
import {Alert, BackHandler, View} from 'react-native';
import {colors} from '../constants';
import AdminBottomNavigation from './AdminBottomNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  const {loggedin, info, access_token} = useSelector(authSelector);

  const [isLoading, setIsLoading] = useState(true);

  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);
  NavigationService.initialize(navigationRef);

  useEffect(() => {
    if (loggedin && access_token) {
      setHeaderConfigAxios(access_token);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Custom BackHandler listener
    const handleBackPress = () => {
      if (NavigationService.canGoBack()) {
        NavigationService.pop();
      } else {
        Alert.alert('Thoát', 'Bạn có muốn đóng ứng dụng không?', [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Ok',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
      }
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    // Remove listener
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  if (isLoading) {
    return <View style={{backgroundColor: colors.WHITE}} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={
          loggedin && info
            ? info.role_id === 1
              ? 'Bottom'
              : 'AdminBottom'
            : 'Auth'
        }
        screenOptions={{
          animation: 'simple_push',
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigattion} />
        <Stack.Screen name="AdminBottom" component={AdminBottomNavigation} />
        <Stack.Screen
          name="RegistriesList"
          component={RegistrationListScreen}
        />
        <Stack.Screen name="CarList" component={CarListScreen} />
        <Stack.Screen
          name="HistoryRegistry"
          component={HistoryRegistryScreen}
        />
        <Stack.Screen
          name="HistoryRegistryDetail"
          component={HistoryRegistryDetailScreen}
        />
        <Stack.Screen name="Infringe" component={InfringeScreen} />
        <Stack.Screen name="InfringeDetail" component={InfringeDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CarDetail" component={CarDetailScreen} />
        <Stack.Screen name="CreateCar" component={CreateCarScreen} />
        <Stack.Screen
          name="RegistryDetail"
          component={RegistrationDetailScreen}
        />
        <Stack.Screen name="UpdateCar" component={UpdateCarScreen} />
        <Stack.Screen
          name="CreateRegistryTime"
          component={CreateRegistryTimeScreen}
        />
        <Stack.Screen
          name="CreateRegistryInfor"
          component={CreateRegistryInforScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
