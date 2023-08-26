import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback} from 'react';
import {HeaderProps} from './Header.types';
import {styles} from './Header.styled';
import {NavigationService} from '../../../services/navigation';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header: FC<HeaderProps> = ({title, onGoback, showBtnGoback = true}) => {
  const insets = useSafeAreaInsets();

  const handleGoBack = useCallback(() => {
    if (onGoback) onGoback();
    if (NavigationService.canGoBack()) NavigationService.goBack();
  }, [onGoback]);

  return (
    <LinearGradient colors={['#2489CF', '#0F6AA9']} style={styles.header}>
      <View
        style={[
          styles.group,
          {
            paddingTop: insets.top,
          },
        ]}>
        {showBtnGoback ? (
          <TouchableOpacity style={styles.btn} onPress={handleGoBack}>
            <Image
              source={require('../../../assets/icons/goBack_icon.png')}
              style={{
                height: 12,
                width: 7.05,
              }}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.btn} />
        )}
        <View style={styles.title}>
          <Text style={styles.title_style}>{title}</Text>
        </View>
        <View style={styles.btn} />
      </View>
    </LinearGradient>
  );
};

export default Header;
