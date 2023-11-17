import {Image} from 'react-native';
import React, {FC} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import Box from '../../components/layout/Box';
import globalStyle, {height} from '../../globalStyle/globalStyle';
import TextComponent from '../../components/text/TextComponent';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface cardProps {
  index: number;
  totalLength: number;
  activeIndex: SharedValue<number>;
  val: any;
}

const Card: FC<cardProps> = ({index, totalLength, activeIndex, val}) => {
  const inputRange = [index - 1, index, index + 1];
  const cardGap = 50;
  const maxVisible = 6;
  const styles = useAnimatedStyle(() => {
    return {
      zIndex: totalLength - index,
      //   bottom: 40,
      opacity: interpolate(activeIndex.value, inputRange, [
        1 - 1 / maxVisible,
        1,
        1,
      ]),

      transform: [
        {
          translateY: interpolate(activeIndex.value, inputRange, [
            -cardGap,
            0,
            height / 2.1 + cardGap,
          ]),
        },
        {
          scale: interpolate(activeIndex.value, inputRange, [0.95, 1, 1]),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        cardStyle.card,
        globalStyle.w10,
        globalStyle.borderRadius,
        globalStyle.bgCredit,
        globalStyle.p1,
        globalStyle.absolute,
        styles,
      ]}>
      <TextComponent>{val}</TextComponent>
      <Box
        style={[
          globalStyle.flexOne,
          globalStyle.bgBlack,
          globalStyle.borderRadius,
          globalStyle.overflowHidden,
        ]}>
        <Image
          style={[globalStyle.w10, globalStyle.h10]}
          source={{
            uri: 'https://images.unsplash.com/photo-1682687982141-0143020ed57a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
          }}
        />
      </Box>
    </Animated.View>
  );
};

const cardStyle = ScaledSheet.create({
  card: {
    height: '400@s',
  },
});

export default Card;
