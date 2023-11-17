import React, {useEffect} from 'react';
import Box from '../components/layout/Box';
import globalStyle, {width} from '../globalStyle/globalStyle';
import {ScaledSheet} from 'react-native-size-matters';
import {mix} from 'react-native-redash';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Driver from './components/Driver';
const Trigonometry = () => {
  const progress = useSharedValue(0);
  const radius = width / 2;
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 3000}), -1, true);
  }, [progress]);
  const derived = useDerivedValue(() => progress.value);
  if (!derived) {
  }
  const theta = mix(progress.value, 0, 2 * Math.PI);

  const anim = useAnimatedStyle(() => {
    const inpuRange = [0, 0.5, 1];

    return {
      transform: [
        {
          translateY: interpolate(progress.value, inpuRange, [0, 150, 300]),
        },
      ],
    };
  });
  return (
    <Box
      style={[
        globalStyle.flexOne,
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
      ]}>
      <Animated.View
        style={[
          globalStyle.absolute,
          {width: 50, height: 50, backgroundColor: 'red'},
          anim,
        ]}
      />
      <Box style={[trigStyle.circle]}>
        <Driver {...{theta, radius, progress}} />
      </Box>
    </Box>
  );
};

const trigStyle = ScaledSheet.create({
  circle: {
    width: width,
    height: width,
    borderRadius: width,
    borderWidth: '3@s',
  },
});

export default Trigonometry;
