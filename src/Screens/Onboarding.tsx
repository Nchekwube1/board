import React, {useState} from 'react';
import Lottie1 from '../assets/lottie/lottie1.json';
import Lottie2 from '../assets/lottie/lottie2.json';
import Lottie3 from '../assets/lottie/lottie3.json';
import Box from '../components/layout/Box';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import globalStyle from '../globalStyle/globalStyle';
import CarouselItem from './components/CarouselItem';
import {ScrollView} from 'react-native-gesture-handler';
const Onboarding = () => {
  const scrollViewRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);
  const [currIndex, setCurrndex] = useState(0);
  if (!currIndex) {
  }
  const setActionIndex = (val: number) => {
    setCurrndex(val);
  };
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
  const items = [
    {
      title: 'Enjoy life',
      subtitle: 'On a budget',
      anim: Lottie1,
      bg: 'black',
    },
    {
      title: 'Enjoy life',
      subtitle: 'On a budget',
      anim: Lottie2,
      bg: 'lightblue',
    },
    {
      title: 'Play cool',
      subtitle: 'At your leisure',
      anim: Lottie3,
      bg: 'cyan',
    },
  ];
  return (
    <Box>
      <Animated.ScrollView
        bounces={false}
        style={[globalStyle.width, globalStyle.height, globalStyle.relative]}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        ref={scrollViewRef as any}
        onScroll={onScroll}
        pagingEnabled>
        {items.map((item, index) => (
          <CarouselItem
            translateX={translateX}
            key={index.toString()}
            item={item}
            index={index}
          />
        ))}
      </Animated.ScrollView>
    </Box>
  );
};

export default Onboarding;
