import {StyleProp, Text, TextStyle} from 'react-native';
import React, {FC} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import {useAppSelector} from '../../constants/utils/hooks';
interface textProps {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onPress?: () => void;
  children: any;
  secondary?: boolean;
  purple?: boolean;
  purpleDark?: boolean;
}
const TextComponent: FC<textProps> = ({
  numberOfLines,
  style,
  children,
  onPress,
  secondary,
  purple,
  purpleDark,
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  return (
    // <RestyleText
    //   variant={'normal'}
    //   color={'mainText'}
    //   numberOfLines={numberOfLines}
    //   style={[
    //     globalStyle.fontPoppinsRegular,
    //     globalStyle.fontSizeNormal,
    //     isDarkMode ? globalStyle.textWhite : globalStyle.textBlack,
    //     style,
    //   ]}>
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={
        [
          globalStyle.fontSize14,
          !secondary && !darkMode && globalStyle.textBlackPrimary,
          secondary && !darkMode && globalStyle.textBlackSecondary,
          // globalStyle.fontWeight500,
          darkMode && !secondary && globalStyle.textWhitePrimary,
          darkMode && secondary && globalStyle.textWhiteSecondary,
          darkMode && purple && globalStyle.textPurple50,
          !darkMode && purple && globalStyle.textPurple10,
          darkMode && purpleDark && globalStyle.textWhitePrimary,
          !darkMode && purpleDark && globalStyle.textPurplePrimary,
          globalStyle.fontManropeRegular,
          style,
        ] as any
      }>
      {children}
    </Text>
  );
};

export default TextComponent;
