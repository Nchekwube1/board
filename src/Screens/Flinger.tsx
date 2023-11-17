import React from 'react';
import Box from '../components/layout/Box';
import globalStyle from '../globalStyle/globalStyle';
import Card from './components/Card';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {SafeAreaView} from 'moti';
const Flinger = () => {
  const duration = 300;
  const activeIndex = useSharedValue(0);
  const data = new Array(12)
    .fill('Item')
    .map((val, index) => `${val} at index ${index}`);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      if (activeIndex.value === 0) {
        return;
      } else {
        activeIndex.value = withTiming(activeIndex.value - 1, {duration});
      }
    });
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (activeIndex.value === data.length) {
        return;
      } else {
        activeIndex.value = withTiming(activeIndex.value + 1, {duration});
      }
    });
  return (
    <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
      <SafeAreaView
        pointerEvents="box-none"
        style={[globalStyle.flexOne, globalStyle.bgBackdrop]}>
        <Box
          pointerEvents="box-none"
          flex={1}
          style={[
            globalStyle.bgBackdrop,
            globalStyle.px2p4,
            globalStyle.justifyEnd,
            globalStyle.alignItemsCenter,
          ]}>
          {data.map((val, index) => (
            <Card
              key={index.toString()}
              index={index}
              totalLength={1}
              val={val}
              activeIndex={activeIndex}
            />
          ))}
        </Box>
      </SafeAreaView>
    </GestureDetector>
  );
};

export default Flinger;
