import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback} from 'react';
import {InfringeScreenProps} from './InfringeScreen.types';
import {Button, Header} from '../../components';
import {styles} from './InfringeScreen.styled';
import {TextInputMask} from 'react-native-masked-text';
import {colors} from '../../constants';

const InfringeScreen: FC<InfringeScreenProps> = ({navigation}) => {
  const [search, setSearch] = React.useState<string>('');

  const handleSubmit = useCallback(() => {
    if (search.length === 0) {
      Alert.alert('Thông báo', 'Không được để trống');
    } else {
      navigation.push('InfringeDetail', {
        search: search,
      });
    }
  }, [search]);

  function check(text: string) {
    return /[a-zA-Z]/.test(text[3]);
  }

  return (
    <View style={{flex: 1}}>
      <Header title="Tra cứu lỗi vi phạm" />
      <ScrollView style={{flex: 1, backgroundColor: colors.LAVENDER_BLUE}}>
        <View style={styles.page_content}>
          <Image
            source={require('../../assets/images/infringe_image.png')}
            style={{
              width: 128,
              height: 128,
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.title}>
            Vui lòng nhập biển kiểm soát để tra cứu
          </Text>
          <View style={styles.search_style}>
            <Image
              source={require('../../assets/icons/search_icon.png')}
              style={{
                width: 14,
                height: 14,
                position: 'absolute',
                left: 20,
              }}
            />
            <TextInputMask
              type={'custom'}
              options={{
                /**
                 * mask: (String | required | default '')
                 * the mask pattern
                 * 9 - accept digit.
                 * A - accept alpha.
                 * S - accept alphanumeric.
                 * * - accept all, EXCEPT white space.
                 */
                mask: check(search)
                  ? '99AS - 99999999999999'
                  : '99A - 999999999999999',
              }}
              autoCapitalize={'characters'}
              value={search}
              style={styles.input_style}
              placeholderTextColor={colors.SLATE_GRAY}
              onChangeText={text => {
                setSearch(text);
              }}
              placeholder="Ví dụ: 43D - 24232"
            />
          </View>
          <Button
            title="TRA CỨU"
            style={styles.footer_btn}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default InfringeScreen;
