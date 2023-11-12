import {TextInput} from 'react-native';
import React, {FC, useState} from 'react';
import TextComponent from '../text/TextComponent';
import inputStyles from './inputStyles';
import {textInputProps} from '../../constants/types/types';
import Feather from 'react-native-vector-icons/Feather';
import palette from '../../constants/colors/pallete';
import globalStyle from '../../globalStyle/globalStyle';
import {useAppSelector} from '../../constants/utils/hooks';
import PressableComponent from '../pressable/PressableComponent';
import Box from '../layout/Box';

const PasswordInputComponent: FC<textInputProps> = ({
  errorText,
  title,
  ...props
}) => {
  const [visible, setVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {darkMode} = useAppSelector(state => state.darkMode);
  const toggleShowPassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };
  let iconView = (
    <Feather
      name="eye-off"
      size={18}
      color={darkMode ? palette.darkModeSecText : palette.textBlackSecondary}
    />
  );
  if (!showPassword) {
    iconView = (
      <Feather
        name="eye"
        size={18}
        color={darkMode ? palette.darkModeSecText : palette.textBlackSecondary}
      />
    );
  } else {
    iconView = (
      <Feather
        name="eye-off"
        size={18}
        color={darkMode ? palette.darkModeSecText : palette.textBlackSecondary}
      />
    );
  }
  return (
    <Box style={[globalStyle.w10]}>
      {title && (
        <TextComponent
          secondary
          style={[
            globalStyle.fontManropeRegular,
            globalStyle.mb0p4,
            globalStyle.fontWeight500,
            globalStyle.fontSize13,
          ]}>
          {title}
        </TextComponent>
      )}
      <Box
        style={[
          globalStyle.w10,
          darkMode && globalStyle.bgTextInputDark,
          !darkMode && globalStyle.bgTextInputLight,
          globalStyle.borderRad,
          globalStyle.flexrow,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}>
        <TextInput
          keyboardType="default"
          style={
            [
              globalStyle.textInputHeight,
              globalStyle.flexOne,
              // globalStyle.h10,
              globalStyle.fontManropeRegular,
              globalStyle.pr1,
              globalStyle.pl1,
              globalStyle.fontSize12,
              darkMode && globalStyle.bgTextInputDark,
              !darkMode && globalStyle.bgTextInputLight,
              globalStyle.borderRad,
              globalStyle.textBlackPrimary,
              darkMode && globalStyle.textWhitePrimary,

              // darkMode
              //   ? palette.placeHolderTextDark
              //   : palette.placeHolderTextLight,
              // multiline && globalStyle.multiTextInputHeight,
              // multiline && {textAlignVertical: 'top'},
              // multiline && globalStyle.pt2,
            ] as any
          }
          placeholderTextColor={
            darkMode
              ? palette.placeHolderTextDark
              : palette.placeHolderTextLight
          }
          secureTextEntry={visible}
          textContentType={!showPassword ? 'name' : 'password'}
          {...props}
        />
        <PressableComponent
          onPress={toggleShowPassword}
          style={[
            inputStyles.lockView,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
          ]}>
          {iconView}
        </PressableComponent>
      </Box>

      {errorText && (
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.mt0p8,
          ]}>
          {/* <Box style={[globalStyle.pr0p4]}>
            <ErrorAlert />
          </Box> */}
          <TextComponent
            style={[
              globalStyle.fontSize10,
              // globalStyle.errorText,
              globalStyle.fontWeight400,
              globalStyle.fontManropeRegular,
            ]}>
            {`${errorText}`}
          </TextComponent>
        </Box>
      )}
    </Box>
  );
};

export default PasswordInputComponent;
