import React, {FC} from 'react';
import {dotInterface} from '../../constants/types/types';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import globalStyle from '../../globalStyle/globalStyle';
import pallete from '../../constants/colors/pallete';
import buttonStyle from './buttonStyle';

const ButtonDot: FC<dotInterface> = ({currentIndex, index}) => {
  const dotStyle = useAnimatedStyle(() => {
    const isActive = currentIndex.value === index;
    return {
      backgroundColor: withTiming(
        isActive ? pallete.white : pallete.passCodeGray,
      ),
      width: withTiming(isActive ? 9 : 8),
      height: withTiming(isActive ? 9 : 8),
      opacity: withTiming(isActive ? 1 : 0.5),
    };
  });
  return <Animated.View style={[buttonStyle.dot, globalStyle.mr1, dotStyle]} />;
};

export default ButtonDot;
