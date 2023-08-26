import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useRef} from 'react';
import {PopUpModalProps} from './PopUpModal.types';
import {useDispatch, useSelector} from 'react-redux';
import {closeModal, modalSelector} from '../../../redux';
import {styles} from './PopUpModal.styled';

const PopUpModal: FC<PopUpModalProps> = ({}) => {
  const {isOpen, content, actions, onClose, handleConfirm} =
    useSelector(modalSelector);
  const dispatch = useDispatch();

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const onCloseModalHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }

    dispatch(closeModal());
  }, [dispatch, onClose]);

  const onBackDropClickHandler = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, fadeAnimation]);

  const onConfirm = useCallback(() => {
    if (handleConfirm) handleConfirm();
    dispatch(closeModal());
  }, [handleConfirm]);

  return (
    <Modal
      animationType="none"
      visible={isOpen}
      onRequestClose={onCloseModalHandler}
      transparent>
      <TouchableOpacity
        onPress={onBackDropClickHandler}
        style={styles.container}
        testID="backdrop">
        <TouchableWithoutFeedback style={styles.modalContainer}>
          <Animated.View
            style={[styles.modalContent, {opacity: fadeAnimation}]}>
            <View style={[styles.modalWrapper, styles.modalWrapperTop]}>
              {content}
            </View>
            {!actions ? (
              <View style={styles.btn_group}>
                <TouchableOpacity
                  style={[
                    styles.btn_style,
                    {
                      borderRightColor: '#E1E9F6',
                      borderRightWidth: 1,
                      borderStyle: 'solid',
                    },
                  ]}
                  onPress={onCloseModalHandler}>
                  <Text style={[styles.btn_text, {color: '#394B6A'}]}>
                    Không
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_style} onPress={onConfirm}>
                  <Text style={[styles.btn_text, {color: '#0F6AA9'}]}>Có</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.modalWrapper, styles.modalWrapperBottom]}>
                {actions.map(action => action)}
              </View>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default PopUpModal;
