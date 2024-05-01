import { Dimensions, StyleSheet } from "react-native";
import { ModalConfig, ModalData, ModalHideParams, ModalOptions, ModalShowParams } from "../types";
import RNModal from "react-native-modal";
import { useCallback, useState } from "react";
import { BaseBottomModalContainer } from "./BaseBottomModal.tsx";

export type ModalUIProps = {
  isVisible: boolean;
  options: ModalOptions;
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
  const baseHeight = 400
  const [height, setHeight] = useState(baseHeight);
  const { children } = data;
  const { style } = config || {};
  const { dismissable, position, animated } = options;
  
  const isBottomAndAnimated = position === 'bottom' && animated === true;
  const swipeDirection = animated ? 'down' : undefined;
  

  const onBackdropPress = useCallback(() => {
    if (dismissable) {
      hide({});
    }
  }, []);

  if (!children) {
    return null;
  }
  
  const renderAnimatedBottomModal = () => {
    return (
      <BaseBottomModalContainer style={{ backgroundColor: "white" }} height={height}>
        {children}
      </BaseBottomModalContainer>
    )
  }

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SCREEN_HEIGHT}
      deviceWidth={SCREEN_WIDTH}
      style={[modalPositionStyles[position], styles.modal, style]}
      onBackdropPress={onBackdropPress}
      avoidKeyboard={false}
      swipeDirection={swipeDirection}
      swipeThreshold={40}
      onSwipeMove={e => {
        if(isBottomAndAnimated) {
          const newHeight = baseHeight * e;
          setHeight(newHeight)
        }
      }}
      onSwipeCancel={() => {
        if(isBottomAndAnimated) {
          setHeight(baseHeight);
        }
      }}
      onSwipeComplete={(params, gestureState) => {
        if(isBottomAndAnimated) {
          if (params.swipingDirection === 'down' && gestureState.dy > (baseHeight * 0.3)) {
            hide({});
          } else {
            setHeight(baseHeight);
          }
        }
      }}
      onModalHide={() => {
        onHide();
        if(isBottomAndAnimated) {
          setHeight(baseHeight);
        }
      }}
      backdropOpacity={0.4}
    >
      {isBottomAndAnimated ? renderAnimatedBottomModal() : children}
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
