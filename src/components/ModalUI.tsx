import { Dimensions, StyleSheet } from 'react-native';
import {
  ModalConfig,
  ModalData,
  ModalHideParams,
  ModalOptions,
  ModalShowParams,
} from '../types';
import RNModal from 'react-native-modal';
import { useCallback } from 'react';

export type ModalUIProps = {
  isVisible: boolean;
  options: Required<ModalOptions>;
  data: ModalData;
  show: (params: ModalShowParams) => void;
  hide: (params: ModalHideParams) => void;
  config?: ModalConfig;
  onHide: () => void;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const ModalUI = ({
  isVisible,
  data,
  options,
  hide,
  onHide,
  config,
}: ModalUIProps) => {
  const { children } = data;
  const { style } = config || {};
  const { dismissable, position } = options;

  console.debug({ style });

  const onBackdropPress = useCallback(() => {
    if (dismissable) {
      hide({});
    }
  }, []);

  if (!children) {
    return null;
  }

  return (
    <RNModal
      animationOut={'slideOutDown'}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SCREEN_HEIGHT}
      deviceWidth={SCREEN_WIDTH}
      style={[modalPositionStyles[position], styles.modal, style]}
      onBackdropPress={onBackdropPress}
      avoidKeyboard={false}
      onModalHide={onHide}
      backdropOpacity={0.4}>
      {children}
    </RNModal>
  );
};

const modalPositionStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    margin: 20,
  },
  bottom: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const styles = StyleSheet.create({
  modal: {},
});
