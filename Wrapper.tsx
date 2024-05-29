import React, {useEffect} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/constants/theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import globalStyle from './src/globalStyle/globalStyle';
import {useAppSelector} from './src/constants/utils/hooks';
// import DeviceInfo from 'react-native-device-info';
import palette from './src/constants/colors/pallete';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Box from './src/components/layout/Box';
import ScaleList from './src/Screens/ScaleList';
import FaceDetector from './src/Screens/FaceDetector';
import FingerBubbles from './src/Screens/FingerBubbles';
import SkiaPlayground from './src/Screens/SkiaPlayground';
import LayoutFlat from './src/Screens/LayoutFlat';
import Accordion from './src/Screens/Accordion';
import AnimatedText from './src/Screens/AnimatedText';
import RangeSlider from './src/Screens/RangeSlider';
const links = {
  prefixes: ['tribapay://'],
};
const Wrapper = () => {
  const {darkMode} = useAppSelector(state => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      SystemNavigationBar.setNavigationColor(palette.darkBg, 'light');
    } else {
      SystemNavigationBar.setNavigationColor(palette.whiteBg, 'dark');
    }
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? theme.darkTheme : theme.lightTheme}>
      <GestureHandlerRootView style={[globalStyle.flexOne]}>
        <Box style={[globalStyle.flexOne]}>
          <NavigationContainer
            onReady={() => {
              // SplashScreen.hide();
            }}
            linking={links}>
            <RangeSlider />
            {/* <AnimatedText /> */}
            {/* <Accordion /> */}
            {/* <LayoutFlat /> */}
            {/* <SkiaPlayground /> */}
            {/* <FingerBubbles /> */}
            {/* <FaceDetector /> */}
            {/* <ScaleList /> */}
            {/* <Flinger /> */}
            {/* <Onboarding /> */}
            {/* <ToastComponent /> */}
            {/* <MainNavigation /> */}
          </NavigationContainer>
        </Box>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export default Wrapper;
