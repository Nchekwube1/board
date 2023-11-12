import React, {FC, useCallback, useEffect} from 'react';
import TextComponent from '../text/TextComponent';
import globalStyle from '../../globalStyle/globalStyle';
import Box from '../layout/Box';
import {useSharedValue} from 'react-native-reanimated';
import buttonStyle from './buttonStyle';
import ButtonDot from './ButtonDot';
import PressableComponent from '../pressable/PressableComponent';
import {useAppSelector, usePrimaryTintBg} from '../../constants/utils/hooks';
import {buttonProps} from './ButtonComponent';

const ButtonWithIconComponent: FC<buttonProps> = ({
  disabled,
  title,
  onPress,
  loading = false,
  transparent = false,
  smallText,
  secondary,
  error,
  redBtn,
  tint,
  icon,
  ...rest
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  const currentPos = useSharedValue(0);
  const tintBg = usePrimaryTintBg();
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
        transparent && globalStyle.bgTransparent,
        transparent && globalStyle.borderTransBtn,
        transparent && darkMode && globalStyle.borderTransBtnDark,
        secondary && globalStyle.borderSecondaryBtn,
        secondary && darkMode && globalStyle.borWhite,
        secondary && globalStyle.bgTransparent,
        loading && globalStyle.bgTransparent,
        !!tint && tintBg,
      ]}>
      <PressableComponent
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
        {...rest}
        style={[
          // globalStyle.py1p5,
          buttonStyle.buttonBr as any,
          globalStyle.flexrow,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}>
        {!loading && (
          <Box style={[globalStyle.flexrow, globalStyle.alignItemsCenter]}>
            {icon}
            <Box style={[globalStyle.pl1p2]}>
              <TextComponent
                style={[
                  globalStyle.flexrow,
                  globalStyle.textCenter,
                  globalStyle.textWhitePrimary,
                  globalStyle.fontWeight600,
                  globalStyle.fontManropeBold,
                  globalStyle.fontSize16,
                  smallText && globalStyle.fontSize13,
                  // smallText && globalStyle.fontWeight400,
                  redBtn && globalStyle.textRedBtn,
                  secondary && globalStyle.textPurple10,
                  secondary && darkMode && globalStyle.textWhitePrimary,
                  transparent && !darkMode && globalStyle.textBlackPrimary,
                  !!tint && !darkMode && globalStyle.textBlackPrimary,
                ]}>
                {title}
              </TextComponent>
            </Box>
          </Box>
        )}
        {loading &&
          new Array(3).fill('*').map((item, index) => {
            return (
              <ButtonDot
                currentIndex={currentPos}
                index={index}
                key={index.toString() + item}
              />
            );
          })}
      </PressableComponent>
    </Box>
  );
};

export default ButtonWithIconComponent;
