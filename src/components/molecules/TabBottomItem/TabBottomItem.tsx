import {Image, View} from 'react-native';
import React, {FC} from 'react';
import {TabBottomItemProps} from './TabBottomItem.types';
import {styles} from './TabBottomItem.styled';
import {colors} from '../../../constants';

const TabBottomItem: FC<TabBottomItemProps> = ({icon, props}) => {
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

export default TabBottomItem;
