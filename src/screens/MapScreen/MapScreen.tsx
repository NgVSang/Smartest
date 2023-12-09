/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  Alert,
  Platform,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {MapScreenProps} from './MapScreen.types';
import {Footer, Header, Loading} from '../../components';
import {styles} from './MapScreen.styled';
import {colors} from '../../constants';
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {debounce} from 'lodash';
import {PERMISSIONS, request} from 'react-native-permissions';
import {GeoApi} from '../../services/api';
import {IPosition, IPrediction} from '../../types';
import {useDispatch} from 'react-redux';
import {setCurrentPosition, setHistoryPosition} from '../../redux';
import Toast from 'react-native-toast-message';

const MapScreen: FC<MapScreenProps> = ({navigation}) => {
  const mapRef = useRef<MapView>(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [text, setText] = useState<string>();
  const [position, setPosition] = useState<IPosition>();
  const [predictions, setPredictions] = useState<IPrediction[]>([]);
  const [open, setOpen] = useState(false);

  const mapProvider = useMemo(
    () => (Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE),
    [],
  );

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'ios') {
    }
    if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
  }, []);

  useEffect(() => {
    requestPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(async (text: string) => {
      if (text !== '') {
        try {
          setPredictions([]);
          setLoading(true);
          const res = await GeoApi.autoComplete(text);
          setPredictions(res.data.predictions);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }, 1000),
    [],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setText(text);
      debounceSearch(text);
    },
    [debounceSearch],
  );

  const handlePressItem = useCallback(async (prediction: IPrediction) => {
    try {
      setLoadingFetch(true);
      const res = await GeoApi.getPlaceById(prediction.place_id);
      const location = res.data.result.geometry.location;
      const distance = await GeoApi.getDistance(location.lat, location.lng);
      console.log(distance.data.rows[0].elements[0].distance);
      setPosition({
        place_id: prediction.place_id,
        coordinate: {
          latitude: location.lat,
          longitude: location.lng,
        },
        description: prediction.description,
        distance: distance.data.rows[0].elements[0].distance,
      });
      setText(prediction.description);
      setOpen(false);
    } catch (error: any) {
      console.log(error.message);

      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra',
        text2: 'Vui lòng thử lại sau',
      });
    } finally {
      setLoadingFetch(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (position) {
      dispatch(setCurrentPosition(position));
      dispatch(setHistoryPosition(position));
      navigation.pop();
    } else {
      Alert.alert('Cảnh báo', 'Vui lòng chọn ví trí');
    }
  }, [dispatch, navigation, position]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Header title="Chọn địa chỉ trên bản đồ" />
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor={colors.SLATE_GRAY}
            onChangeText={handleSearch}
            onPressIn={() => {
              setOpen(true);
            }}
            value={text}
          />
          {open && (
            <View style={styles.drop_down}>
              <ScrollView style={styles.ScrollView}>
                {loading && <Loading />}
                {predictions.map((prediction, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      handlePressItem(prediction);
                    }}
                    key={index}>
                    <Text style={styles.drop_text}>
                      {prediction.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            provider={mapProvider}
            initialRegion={{
              latitude: 16.048660316245975,
              longitude: 108.21574442088604,
              latitudeDelta: 0.21688808266279125,
              longitudeDelta: 0.15441477298736572,
            }}
            style={{flex: 1}}
            testID="map-view"
            // onPress={handleMapClick}
          >
            <Marker
              coordinate={{
                latitude: 16.0119633,
                longitude: 108.1837542,
              }}>
              <View>
                <Image
                  source={require('../../assets/icons/logo_map_icon.jpg')}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                  }}
                />
                <Callout style={styles.calloutWrapper}>
                  <View style={styles.callOutInnerWrapper}>
                    <Text style={styles.calloutText}>
                      Trung tâm đăng kiểm SMARTEST
                      {'\n'}
                      58 Trường Sơn, Quận Cẩm Lệ, TP. Đà Nẵng
                    </Text>
                  </View>
                </Callout>
              </View>
            </Marker>
            {position && (
              <Marker coordinate={position.coordinate}>
                <Callout style={styles.calloutWrapper}>
                  <View style={styles.callOutInnerWrapper}>
                    <Text style={styles.calloutText}>
                      {position.description}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            )}
          </MapView>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text} maxFontSizeMultiplier={2}>
            {position && position.description
              ? position.description
              : 'Chọn vị trí'}
          </Text>
          <Footer
            buttonOkContent="CHỌN"
            style={{backgroundColor: colors.WHITE}}
            onClickButtonOk={handleSubmit}
          />
        </View>
        {loadingFetch && (
          <View style={styles.loading}>
            <Loading color={colors.BLUE} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MapScreen;
