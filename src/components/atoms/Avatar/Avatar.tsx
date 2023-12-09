import {Image, Linking} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AvatarProps} from './Avatar.types';
import {BASE_URL} from '../../../config';

const Avatar: FC<AvatarProps> = ({
  imageUrl,
  fallbackImage = require('../../../assets/images/default_avatar.jpg'),
  style,
}) => {
  const [renderAvatar, setRenderAvatar] = useState(<></>);
  useEffect(() => {
    const url = BASE_URL + imageUrl;
    Linking.canOpenURL(url).then(check => {
      if (check) {
        setRenderAvatar(<Image source={{uri: url}} style={style} />);
      } else {
        setRenderAvatar(<Image source={fallbackImage} style={style} />);
      }
    });
  }, [fallbackImage, imageUrl, style]);

  return renderAvatar;
};

export default Avatar;
