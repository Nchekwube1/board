import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import React, {FC, ReactNode, useCallback, useEffect} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import {useSharedValue} from 'react-native-reanimated';
import PressableComponent from '../pressable/PressableComponent';
import palette from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';

export interface buttonProps extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  loading?: boolean;
  transparent?: boolean;
  secondary?: boolean;
  error?: boolean;
  errorTrans?: boolean;
  smallText?: boolean;
  redBtn?: boolean;
  icon?: ReactNode;
  tint?: ReactNode;
  noBorderDark?: boolean;
}

const ButtonComponent: FC<buttonProps> = ({
  disabled,
  title,
  onPress,
  loading = false,
  transparent = false,
  smallText,
  secondary,
  error,
  redBtn,
  errorTrans,
  noBorderDark,
  ...rest
}) => {
  const currentPos = useSharedValue(0);
  const {darkMode} = useAppSelector(state => state.darkMode);
  const changer = useCallback(() => {
    if (loading) {
      if (currentPos.value === 2) {
        currentPos.value = 0;
      } else {
        currentPos.value = currentPos.value + 1;
      }
    }
  }, [currentPos, loading]);
  useEffect(() => {
    const interval = setInterval(() => {
      changer();
    }, 250);

    return () => clearInterval(interval);
  }, [changer]);
  return (
    <Box
      // backgroundColor={'mainBackground'}
      style={[
        globalStyle.w10,
        globalStyle.bgPurple10,
        globalStyle.textInputHeight,
        globalStyle.borderRad,
        disabled && globalStyle.disabledBg,
        error && globalStyle.bgToastSideError,
        redBtn && globalStyle.bgRedBtn,
        (transparent || errorTrans) && globalStyle.bgTransparent,
        errorTrans && globalStyle.borderToastSideError,
        transparent && !darkMode && globalStyle.borderTransBtn,
        transparent &&
          darkMode &&
          !noBorderDark &&
          globalStyle.borderTransBtnDark,
        secondary && globalStyle.borderSecondaryBtn,
        secondary && darkMode && globalStyle.borWhite,
        secondary && globalStyle.bgTransparent,
        loading && globalStyle.bgTransparent,
      ]}>
      <PressableComponent
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
        {...rest}
        style={[
          // globalStyle.py1p5,
          globalStyle.textInputHeight,
          globalStyle.borderRad,
          globalStyle.flexrow,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}>
        {!loading && (
          <TextComponent
            style={[
              globalStyle.flexrow,
              globalStyle.textCenter,
              globalStyle.textWhitePrimary,
              globalStyle.fontManropeMedium,
              globalStyle.fontSize15,
              smallText && globalStyle.fontSize13,
              smallText && globalStyle.fontWeight400,
              redBtn && globalStyle.textRedBtn,
              secondary && darkMode && globalStyle.textWhitePrimary,
              secondary && globalStyle.textPurple10,
              transparent && !darkMode && globalStyle.textBlackPrimary,
              errorTrans && globalStyle.textToastSide,
            ]}>
            {title}
          </TextComponent>
        )}
        {loading && <ActivityIndicator color={palette.primary10} />}
        {/* {loading &&
          new Array(3).fill('*').map((item, index) => {
            return (
              <ButtonDot
                currentIndex={currentPos}
                index={index}
                key={index.toString() + item}
              />
            );
          })} */}
      </PressableComponent>
    </Box>
  );
};

export default ButtonComponent;
