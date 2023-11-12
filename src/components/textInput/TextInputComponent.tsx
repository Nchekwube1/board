import {TextInput} from 'react-native';
import React, {FC} from 'react';
import TextComponent from '../text/TextComponent';
import {textInputProps} from '../../constants/types/types';
import globalStyle from '../../globalStyle/globalStyle';
import palette from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';
import Box from '../layout/Box';
const TextInputComponent: FC<textInputProps> = ({
  errorText,
  title,
  multiline,
  ...otherInputProps
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  return (
    <Box style={[globalStyle.w10]}>
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.alignItemsCenter,
          globalStyle.justifyCenter,
          globalStyle.justifyBetween,
        ]}>
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
      </Box>

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
          multiline={multiline}
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
              multiline && globalStyle.MultiTextInputHeight,
              multiline && {textAlignVertical: 'top'},
              multiline && globalStyle.pt1p6,
            ] as any
          }
          placeholderTextColor={
            darkMode
              ? palette.placeHolderTextDark
              : palette.placeHolderTextLight
          }
          {...otherInputProps}
        />
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

export default TextInputComponent;
