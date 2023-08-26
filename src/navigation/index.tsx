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
  HistoryRegistryDetailScreen,
  HistoryRegistryScreen,
  InfringeDetailScreen,
  InfringeScreen,
  ProfileScreen,
  RegistrationListScreen,
} from '../screens';
import BottomNavigattion from './BottomNavigattion';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux';
import {NavigationService} from '../services/navigation';
import {setHeaderConfigAxios} from '../services/api';
import {View} from 'react-native';
import {colors} from '../constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  const {loggedin, access_token} = useSelector(authSelector);

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

  if (isLoading) {
    return <View style={{backgroundColor: colors.WHITE}} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={loggedin ? 'Bottom' : 'Auth'}
        screenOptions={{
          animation: 'simple_push',
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Bottom" component={BottomNavigattion} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
