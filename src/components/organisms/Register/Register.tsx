import {ScrollView, Text, View} from 'react-native';
import React, {FC} from 'react';
import {RegisterProps} from './Register.types';
import {styles} from './Register.styled';

const Register: FC<RegisterProps> = () => {
  return <ScrollView style={styles.container}></ScrollView>;
};

export default Register;
