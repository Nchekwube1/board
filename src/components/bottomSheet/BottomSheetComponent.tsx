import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect} from 'react';
import ReactNativeModal from 'react-native-modal';
import pallete from '../../constants/colors/pallete';
import globalStyle, {height} from '../../globalStyle/globalStyle';
import {ScaledSheet} from 'react-native-size-matters';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Layout,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Easing, KeyboardAvoidingView, View} from 'react-native';
import {isIos} from '../../constants/utils/utils';
import Box from '../layout/Box';
interface bottomSheetProps {
  setShowBlur: Dispatch<SetStateAction<boolean>>;
  setSuccess?: Dispatch<SetStateAction<boolean>>;
  showBlur: boolean;
  onModalHide?: () => void;
  onOverLayPress?: () => void;
  additionalOnClose?: () => void;
  success?: boolean;
  noOverLay?: boolean;
  grayBg?: boolean;
  avoidKeyboard?: boolean;
  transparent?: boolean;
  showHandle?: boolean;
  otherHide?: boolean;
  children: ReactNode;
  showAvoiding?: boolean;
}
const spring_config = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedTreshold: 0.1,
  stiffness: 500,
};

const BottomSheetComponent: FC<bottomSheetProps> = ({
  setShowBlur,
  showBlur,
  children,
  onModalHide,
  setSuccess,
  onOverLayPress,
  showHandle = true,
  avoidKeyboard = true,
  success = false,
  otherHide = false,
  noOverLay = false,
  grayBg,
  additionalOnClose,
  showAvoiding,
}) => {
  const viewRef = useAnimatedRef<View>();
  const transY = useSharedValue(0);
  const aStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(transY.value, spring_config),
    };
  });
  useEffect(() => {
    if (showBlur) {
      transY.value = 0;
    }
  }, [showBlur, transY]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx: {startTop: number}) {
      ctx.startTop = transY.value;
    },
    onActive(event, ctx) {
      // console.log({event, layoutHeight});
      if (event.translationY > 0) {
        transY.value = ctx.startTop + event.translationY;
      }
    },
    onEnd() {
      if (transY.value < 200) {
        transY.value = 0;
      } else {
        // reset transY
        transY.value = height;
        runOnJS(setShowBlur)(false);
      }
    },
  });

  return (
    <ReactNativeModal
      avoidKeyboard={avoidKeyboard}
      onModalHide={() => {
        success && onModalHide && onModalHide();
        additionalOnClose && additionalOnClose();

        otherHide && onModalHide && onModalHide();
      }}
      animationIn={'slideInUp'}
      onBackButtonPress={() => {
        if (!noOverLay) {
          setShowBlur(false);
          setSuccess && setSuccess(false);
        }
        if (noOverLay && onOverLayPress) {
          setShowBlur(false);
          setSuccess && setSuccess(false);
          onOverLayPress();
        }
      }}
      onBackdropPress={() => {
        if (!noOverLay) {
          setShowBlur(false);
          setSuccess && setSuccess(false);
        }
        if (noOverLay && onOverLayPress) {
          setShowBlur(false);
          setSuccess && setSuccess(false);
          onOverLayPress();
        }
      }}
      animationOut={'slideOutDown'}
      backdropColor={pallete.backdrop}
      style={[globalStyle.m0, globalStyle.justifyEnd]}
      isVisible={showBlur}>
      <>
        {showAvoiding && !isIos() ? (
          <KeyboardAvoidingView
            style={[globalStyle.flexOne]}
            behavior={isIos() ? 'padding' : 'height'}>
            <PanGestureHandler
              onGestureEvent={noOverLay ? undefined : gestureHandler}>
              <Animated.View
                layout={Layout.easing(Easing.linear)}
                // layout={Layout.delay(300)}
                style={[aStyle]}
                ref={viewRef as any}>
                <Box
                  backgroundColor={'mainBackground'}
                  style={[
                    globalStyle.alignItemsCenter,
                    globalStyle.justifyCenter,
                    globalStyle.modalBr,
                    globalStyle.pb3,
                    modalStyle.maxHeight,
                    // globalStyle.py1,
                    grayBg && globalStyle.py0,
                  ]}>
                  {showHandle && (
                    <Box
                      style={
                        [
                          // modalStyle.handle
                        ]
                      }
                    />
                  )}

                  {children}
                </Box>
              </Animated.View>
            </PanGestureHandler>
          </KeyboardAvoidingView>
        ) : (
          <PanGestureHandler
            onGestureEvent={noOverLay ? undefined : gestureHandler}>
            <Animated.View style={[aStyle]} ref={viewRef as any}>
              <Box
                backgroundColor={'mainBackground'}
                style={[
                  globalStyle.alignItemsCenter,
                  globalStyle.justifyCenter,
                  globalStyle.modalBr,
                  globalStyle.pb3,
                  modalStyle.maxHeight,
                  globalStyle.py1,
                  grayBg && globalStyle.py0,
                ]}>
                {showHandle && (
                  <Box
                    style={
                      [
                        // modalStyle.handle
                      ]
                    }
                  />
                )}

                {children}
              </Box>
            </Animated.View>
          </PanGestureHandler>
        )}
      </>
      {/* <PanGestureHandler
        onGestureEvent={noOverLay ? undefined : gestureHandler}>
        <Animated.View style={[aStyle]} ref={viewRef as any}>
          <Box
            backgroundColor={'mainBackground'}
            style={[
              globalStyle.alignItemsCenter,
              globalStyle.justifyCenter,
              globalStyle.modalBr,
              globalStyle.pb2,
              modalStyle.maxHeight,
              globalStyle.py1,
              grayBg && globalStyle.py0,
            ]}>
            {showHandle && (
              <Box
                style={[
                  modalStyle.handle,
                  darkMode && globalStyle.bgTextInputLight,
                ]}
              />
            )}
            <KeyboardAwareScrollView
              style={[
                globalStyle.w10,
                globalStyle.height,
                globalStyle.flexOne,
              ]}>
              {children}
            </KeyboardAwareScrollView>
          </Box>
        </Animated.View>
      </PanGestureHandler> */}
    </ReactNativeModal>
  );
};

const modalStyle = ScaledSheet.create({
  modal: {
    bottom: '-20@s',
  },
  handle: {
    width: '60@s',
    height: '3@s',
    borderRadius: '15@s',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  maxHeight: {
    maxHeight: height + 30,
  },
} as Record<any, any>);

export default BottomSheetComponent;
