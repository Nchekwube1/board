import React, {useEffect, useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Canvas, Circle} from '@shopify/react-native-skia';
import globalStyle, {height} from '../globalStyle/globalStyle';
import LayoutWithSafeAreaWithoutScroll from '../components/layout/LayoutWithSafeAreaWithoutScroll';
import Box from '../components/layout/Box';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const CircleDot = ({
  index,
  xPosition,
  yPosition,
}: {
  index: number;
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
}) => {
  const currentRow = Math.floor(index / 12) * 30;
  const currentColumn = Math.floor(index % 12) * 30 + 35;

  const radius = useDerivedValue(() => {
    const hypotenuse = Math.hypot(
      xPosition.value - currentColumn,
      yPosition.value - currentRow - 30,
    );

    if (hypotenuse < 47 && xPosition.value !== 1) {
      return withSpring(11, {
        overshootClamping: true,
      });
    } else {
      return withSpring(3, {
        overshootClamping: true,
      });
    }
  }, [xPosition, yPosition]);

  return (
    <Circle
      cx={currentColumn}
      cy={currentRow + 30}
      r={radius}
      color={'green'}
    />
  );
};

const FingerBubbles = () => {
  const xPosition = useSharedValue(-1);
  const yPosition = useSharedValue(-1);
  const gesture = Gesture.Pan()
    .onEnd(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onFinalize(() => {
      xPosition.value = -1;
      yPosition.value = -1;
    })
    .onBegin(({x, y}) => {
      xPosition.value = x;
      yPosition.value = y;
    })
    .onChange(({x, y}) => {
      xPosition.value = x;
      yPosition.value = y;
    });

  const [nums, setNums] = useState<number[]>([]);
  useEffect(() => {
    const dotsForHeight = Math.round(height / 35);
    const numsArray = Array.from(Array(12 * dotsForHeight).keys());
    // console.log({
    //   numsArray,
    // });

    setNums(numsArray);
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <LayoutWithSafeAreaWithoutScroll>
        <Box flex={1}>
          <Canvas
            style={[globalStyle.w10, globalStyle.h10, globalStyle.bgWhite]}>
            {nums.map(dotIndex => (
              <CircleDot
                key={dotIndex}
                index={dotIndex}
                xPosition={xPosition}
                yPosition={yPosition}
              />
            ))}
          </Canvas>
        </Box>
      </LayoutWithSafeAreaWithoutScroll>
    </GestureDetector>
  );
};

export default FingerBubbles;
