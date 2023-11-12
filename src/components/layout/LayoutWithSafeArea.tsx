import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import pallete from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';
interface MainLayoutProps {
  children: ReactNode;
  transparent?: boolean;
}
const LayoutWithSafeArea: FC<MainLayoutProps> = ({children, transparent}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  return (
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
          globalStyle.bgPrimary,
          darkMode && globalStyle.bgDarkPrimary,
          transparent && globalStyle.bgTransparent,
        ]}>
        <Box
          flex={1}
          backgroundColor={'mainBackground'}
          style={[transparent && globalStyle.bgTransparent]}>
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
            style={[
              globalStyle.flexOne,
              transparent && globalStyle.bgTransparent,
            ]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={[globalStyle.flexOne]}>
              {children}
            </ScrollView>
          </TouchableWithoutFeedback>
        </Box>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LayoutWithSafeArea;
