import {Text, View} from 'react-native';
import React, {FC} from 'react';
import {styles} from './Infringe.styled';
import {formatDate} from '../../../utils/string';
import {InfringeProps} from './Infringe.types';

const Infringe: FC<InfringeProps> = ({data}) => {
  return (
    <View style={styles.group}>
      <Text style={styles.date}>{formatDate(data.date)}</Text>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.where}>Cơ quan xử lý: {data.handlingAgency}</Text>
    </View>
  );
};

export default Infringe;
