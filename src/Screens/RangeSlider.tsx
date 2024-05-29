import {Text, View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import Box from '../components/layout/Box';
import globalStyle, {width} from '../globalStyle/globalStyle';
import TextComponent from '../components/text/TextComponent';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const _boxWidth = width * 0.9;
const _padding = 24;
const _slideHeight = 8;
const _circleSize = 14;
const _maxWidth = _boxWidth - _circleSize;

const RangeSlider = () => {
  const x1 = useSharedValue(0);
  const x2 = useSharedValue(_maxWidth);
  const start1 = useSharedValue(0);
  const start2 = useSharedValue(0);
  const z1 = useSharedValue(3);
  const z2 = useSharedValue(3);
  const rStyle = useAnimatedStyle(() => {
    return {
      zIndex: 2,
      transform: [
        {
          translateX: x1.value,
        },
      ],
      width: Math.round(x2.value - x1.value),
    };
  });
  const x1Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x1.value,
        },
      ],
      zIndex: z1.value,
      top: (_slideHeight - _circleSize) / 2,
    };
  });
  const x2Style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x2.value,
        },
      ],
      zIndex: z2.value,
      top: (_slideHeight - _circleSize) / 2,
    };
  });
  const gesture1 = Gesture.Pan()
    .onBegin(({translationX}) => {
      x1.value = start1.value;
      // }
    })
    .onUpdate(({translationX}) => {
      const total = translationX + start1.value;
      //   console.log({
      //     total,
      //   });

      //   x1.value = total;
      if (total < 0) {
        x1.value = 0;
      } else {
        x1.value = total;
      }
    })
    .onEnd(({translationX}) => {
      //   console.log({
      //     translationX,
      //   });

      start1.value = translationX;
    });
  const gesture2 = Gesture.Pan()
    .onBegin(({translationX}) => {
      x2.value = start2.value;
      // }
    })
    .onUpdate(({translationX}) => {
      const total = translationX + start2.value;
      //   console.log({
      //     total,
      //   });

      //   x1.value = total;
      if (total > _maxWidth) {
        x2.value = _maxWidth;
      } else if (total < x1.value + 34) {
        x2.value = x1.value + 34;
      } else {
        x2.value = total;
      }
    })
    .onEnd(({translationX}) => {
      //   console.log({
      //     translationX,
      //   });

      start2.value = translationX;
    });
  return (
    <Box
      style={[
        globalStyle.flexOne,
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
      ]}>
      <Box
        style={[
          globalStyle.borderRadius16,
          globalStyle.py3,
          globalStyle.bgWhite,
          globalStyle.shadowRadius,
          {
            width: _boxWidth,
            // paddingHorizontal: _padding,
          },
        ]}>
        <Box position={'relative'}>
          <GestureDetector gesture={gesture1}>
            <Animated.View
              style={[
                styles.thumb,
                globalStyle.bgGold,
                globalStyle.absolute,
                x1Style,
              ]}
            />
          </GestureDetector>
          <GestureDetector gesture={gesture2}>
            <Animated.View
              style={[
                styles.thumb,
                globalStyle.bgGold,
                globalStyle.absolute,
                x2Style,
              ]}
            />
          </GestureDetector>
          <Box
            style={[
              styles.bottomSlide,
              globalStyle.w10,
              globalStyle.borderRadius16,
              //   globalStyle.absolute,
            ]}
          />
          <Animated.View
            style={[
              styles.bottomSlide,
              globalStyle.w10,
              //   globalStyle.borderRadius16,
              globalStyle.absolute,
              globalStyle.bgBlack,
              rStyle,
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RangeSlider;

const styles = ScaledSheet.create({
  bottomSlide: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: _slideHeight,
  },
  thumb: {
    width: _circleSize,
    height: _circleSize,
    borderRadius: _circleSize,
    borderWidth: '2@s',
    borderColor: 'rgba(0,0,0)',
  },
});
