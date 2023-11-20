import {} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import palette from '../../constants/colors/pallete';

interface dotInterface {
  currentIndex: SharedValue<number>;
  index: number;
  size: number;
  spacing: number;
}

const Dot: FC<dotInterface> = ({currentIndex, index, size, spacing}) => {
  //   console.log({
  //     currentIndex: currentIndex.value,
  //   });

  const dotStyle = useAnimatedStyle(() => {
    const visible = 4;
    const isActive = currentIndex.value === index;
    const inputRange = [index - 1, index, index + 1];
    return {
      backgroundColor: withTiming(
        isActive ? palette.primary : palette.backdrop,
      ),
      width: size,
      height: size,
      marginRight: spacing,
      borderRadius: size,
      opacity: interpolate(currentIndex.value, inputRange, [
        1 - 1 / visible,
        1,
        1 - 1 / visible,
      ]),

      transform: [
        {
          scale: interpolate(currentIndex.value, inputRange, [0.9, 1, 0.9]),
        },
      ],
    };
  });
  return <Animated.View style={dotStyle} />;
};

export default Dot;
