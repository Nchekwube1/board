import React, {FC} from 'react';
import globalStyle from '../../globalStyle/globalStyle';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {ViewToken} from 'react-native';

interface scaleProp {
  viewableItem: SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
}

const ScaleListItem: FC<scaleProp> = ({viewableItem, item}) => {
  const style = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItem.value
        .filter(ite => ite.isViewable)
        .find(vIt => vIt.index === item.id),
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0.6, {
        duration: 300,
      }),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6, {duration: 300}),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        globalStyle.w9,
        style,
        {
          height: 80,
          backgroundColor: 'cyan',
          marginBottom: 12,
          borderRadius: 12,
          alignSelf: 'center',
          // marginLeft: '5%',
        },
      ]}
    />
  );
};

export default ScaleListItem;
