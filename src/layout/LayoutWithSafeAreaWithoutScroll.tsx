import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import pallete from '../../constants/colors/pallete';
import {StatusBar} from 'react-native';
import {useAppSelector} from '../../constants/utils/hooks';
interface MainLayoutProps {
  children: ReactNode;
  grayBg?: boolean;
  transparent?: boolean;
  showAvoiding?: boolean;
  hideTouchable?: boolean;
}
const LayoutWithSafeAreaWithoutScroll: FC<MainLayoutProps> = ({
  children,
  showAvoiding = true,
  transparent,
  hideTouchable,
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  return (
    <>
      {showAvoiding ? (
        <KeyboardAvoidingView
          style={[globalStyle.flexOne]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar
            backgroundColor={darkMode ? pallete.darkBg : pallete.whiteBg}
            barStyle={darkMode ? 'light-content' : 'dark-content'}
          />

          <SafeAreaView
            style={[
              globalStyle.flexOne,
              globalStyle.bgWhite,
              transparent && globalStyle.bgTransparent,
              darkMode && globalStyle.bgDarkPrimary,
            ]}>
            <Box
              flex={1}
              backgroundColor={'mainBackground'}
              style={[transparent && globalStyle.bgTransparent]}>
              {hideTouchable ? (
                <>{children}</>
              ) : (
                <TouchableWithoutFeedback
                  accessible={false}
                  onPress={Keyboard.dismiss}
                  style={[
                    globalStyle.flexOne,
                    transparent && globalStyle.bgTransparent,
                  ]}>
                  {children}
                </TouchableWithoutFeedback>
              )}
            </Box>
          </SafeAreaView>
        </KeyboardAvoidingView>
      ) : (
        <Box backgroundColor={'mainBackground'} flex={1}>
          <StatusBar
            backgroundColor={darkMode ? pallete.darkBg : pallete.whiteBg}
            barStyle={darkMode ? 'light-content' : 'dark-content'}
          />
          <SafeAreaView
            style={[
              globalStyle.flexOne,
              globalStyle.bgWhite,
              transparent && globalStyle.bgTransparent,
              darkMode && globalStyle.bgDarkPrimary,
            ]}>
            <Box flex={1} backgroundColor={'mainBackground'}>
              {hideTouchable ? (
                <>{children}</>
              ) : (
                <TouchableWithoutFeedback
                  accessible={false}
                  onPress={Keyboard.dismiss}
                  style={[
                    globalStyle.flexOne,
                    transparent && globalStyle.bgTransparent,
                  ]}>
                  {children}
                </TouchableWithoutFeedback>
              )}
            </Box>
          </SafeAreaView>
        </Box>
      )}
    </>
  );
};

export default LayoutWithSafeAreaWithoutScroll;
