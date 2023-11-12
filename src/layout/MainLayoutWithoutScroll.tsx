import React, {FC, ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import globalStyle from '../../globalStyle/globalStyle';
import Box from './Box';
import {StatusBar} from 'react-native';
import {useAppSelector} from '../../constants/utils/hooks';
import pallete from '../../constants/colors/pallete';

interface MainLayoutProps {
  children: ReactNode;
  grayBg?: boolean;
}
const MainLayoutWithoutScrollComponent: FC<MainLayoutProps> = ({children}) => {
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
          {children}
        </TouchableWithoutFeedback>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default MainLayoutWithoutScrollComponent;
