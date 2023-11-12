import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import globalStyle, {width} from '../../globalStyle/globalStyle';
import Box from '../../components/layout/Box';
import {ScaledSheet} from 'react-native-size-matters';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface itemProp {
  item: any;
  index: number;
  translateX: SharedValue<number>;
}

const CarouselItem: FC<itemProp> = ({index, item, translateX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const circleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [1, 4, 4],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });
  return (
    <Box
      style={[
        globalStyle.width,
        globalStyle.alignItemsCenter,
        globalStyle.height,
      ]}>
      <Box
        style={[
          itemStyle.circleContainer,
          globalStyle.justifyEnd,
          globalStyle.alignItemsCenter,
          // globalStyle.overflowHidden,
        ]}>
        <Animated.View
          style={[
            globalStyle.absolute,
            itemStyle.circle,
            globalStyle.br,
            circleStyle,
            {backgroundColor: item.bg},
          ]}
        />
      </Box>
      <LottieView
        autoPlay
        source={item.anim}
        style={[globalStyle.w10, globalStyle.h7]}
      />
    </Box>
  );
};

const itemStyle = ScaledSheet.create({
  circle: {
    width: width,
    height: width,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default CarouselItem;
