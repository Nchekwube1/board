import {StatusBar} from 'react-native';
import React, {useMemo, useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';
import Box from '../components/layout/Box';
import globalStyle, {width} from '../globalStyle/globalStyle';
import Dot from './components/Dot';
import palette from '../constants/colors/pallete';

const ScaleCarousel = () => {
  const scrollViewRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);
  const size = 12;
  const spacing = size / 2;
  const currentIndex = useDerivedValue(() => {
    return translateX.value / width;
  }, [translateX.value]);
  const [currIndex, setCurrndex] = useState(0);
  if (!currIndex) {
  }
  const setActionIndex = (val: number) => {
    setCurrndex(val);
  };

  const data = useMemo(
    () => [
      palette.Bottom_nav_background,
      palette.Primary_text,
      palette.Primary_color,
      palette.passCodeGray,
      palette.airtimeDark,
      palette.goldBg,
      palette.gloBg,
      palette.backdropColor,
      palette.badgeColor,
      palette.darkInput_bg,
      palette.stepError,
      palette.spectranet,
      palette.green50Dark,
    ],
    [],
  );

  const viewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -currentIndex.value * (size + spacing),
        },
      ],
    };
  });
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      //   let offset = Math.round(event.contentOffset.x / width);
      let offset = event.contentOffset.x;
      translateX.value = offset;
      runOnJS(setActionIndex)(offset);
      //   widthVal.value = 0;
      //   scrollingWorklet();
    },
  });
  return (
    <Box
      style={[globalStyle.justifyCenter, globalStyle.alignItemsCenter]}
      flex={1}>
      <StatusBar hidden />
      {/* <Box
        style={[
          globalStyle.absolute,
          globalStyle.height,
          {width: 1, backgroundColor: 'green'},
        ]}
      /> */}
      <Box flex={0.9}>
        <Animated.ScrollView
          bounces={false}
          style={[globalStyle.width, globalStyle.h10, globalStyle.relative]}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEventThrottle={16}
          ref={scrollViewRef as any}
          onScroll={onScroll}
          pagingEnabled>
          {[...data, ...data].map((item, index) => (
            <Box
              key={index.toString()}
              style={[
                globalStyle.width,
                globalStyle.h10,
                globalStyle.borderRadius16,
                {
                  backgroundColor: item,
                },
              ]}
            />
          ))}
        </Animated.ScrollView>
      </Box>
      <Animated.View
        // flex={0.1}
        style={[
          globalStyle.flexrow,
          globalStyle.alignItemsCenter,
          viewStyle,
          //   globalStyle.flexOne,
          //   globalStyle.justifyCenter,
          {
            left: width / 2 - (size + spacing + 4),
            flex: 0.1,
            // backgroundColor: 'red',
          },
        ]}>
        {new Array(20).fill('a').map((item, index) => (
          <Dot
            key={index.toString()}
            currentIndex={currentIndex}
            index={index}
            size={size}
            spacing={spacing}
          />
        ))}
      </Animated.View>
    </Box>
  );
};

export default ScaleCarousel;
