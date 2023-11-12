import React, {FC, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import {StatusBar} from 'react-native';
import pallete from '../../constants/colors/pallete';
import {useAppSelector} from '../../constants/utils/hooks';

interface MainLayoutProps {
  children: ReactNode;
  lightBar?: boolean;
  grayBg?: boolean;
}
const MainLayoutComponent: FC<MainLayoutProps> = ({children}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  return (
    <KeyboardAvoidingView
      style={[globalStyle.flexOne]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        backgroundColor={darkMode ? pallete.darkBg : pallete.whiteBg}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <Box flex={1} backgroundColor={'mainBackground'}>
        <TouchableWithoutFeedback
          accessible={false}
          onPress={Keyboard.dismiss}
          style={[globalStyle.flexOne]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={[globalStyle.flexOne]}>
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default MainLayoutComponent;
