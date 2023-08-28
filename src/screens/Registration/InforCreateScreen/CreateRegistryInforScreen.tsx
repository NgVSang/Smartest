import {ScrollView, Text, View} from 'react-native';
import React, {FC} from 'react';
import {CreateRegistryInforScreenProps} from './CreateRegistryInforScreen.types';
import {Header} from '../../../components';
import {styles} from './CreateRegistryInforScreen.styled';

const CreateRegistryInforScreen: FC<CreateRegistryInforScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Đăng ký đăng kiểm" />
      <ScrollView style={styles.scroll_view}></ScrollView>
    </View>
  );
};

export default CreateRegistryInforScreen;
