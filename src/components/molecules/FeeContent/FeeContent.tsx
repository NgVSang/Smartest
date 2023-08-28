import {Text, View} from 'react-native';
import React, {FC} from 'react';
import {FeeContentProps} from './FeeContent.types';
import {styles} from './FeeContent.styled';

const FeeContent: FC<FeeContentProps> = ({title, price, style, ...props}) => {
  return (
    <View style={[styles.fee_group_row, style]} {...props}>
      <Text style={styles.fee_title}>{title}</Text>
      <Text style={styles.fee_content}>{price}</Text>
    </View>
  );
};

export default FeeContent;
