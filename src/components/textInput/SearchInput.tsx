import {TextInput} from 'react-native';
import React, {FC} from 'react';
import TextComponent from '../text/TextComponent';
import inputStyles from './inputStyles';
import Box from '../layout/Box';
import Feather from 'react-native-vector-icons/Feather';
import {textInputProps} from '../../constants/types/types';
import globalStyle from '../../globalStyle/globalStyle';
import palette from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';
const SearchInputComponent: FC<textInputProps> = ({
  errorText,
  title,
  ...props
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  return (
    <Box style={[inputStyles.br8]}>
      {title && (
        <TextComponent
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
        <Box
          style={[
            inputStyles.lockView,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
          ]}>
          <Feather
            name="search"
            size={18}
            color={
              darkMode ? palette.darkModeSecText : palette.textBlackSecondary
            }
          />
        </Box>
        <TextInput
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
            ] as any
          }
          placeholderTextColor={
            darkMode
              ? palette.placeHolderTextDark
              : palette.placeHolderTextLight
          }
          textContentType={'name'}
          {...props}
        />
      </Box>

      {errorText && (
        <TextComponent
          style={[
            globalStyle.fontSize10,
            globalStyle.errorText,
            globalStyle.mt1,
            inputStyles.br8,
          ]}>
          {`${errorText}`}
        </TextComponent>
      )}
    </Box>
  );
};

export default SearchInputComponent;
