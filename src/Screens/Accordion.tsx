import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import Box from '../components/layout/Box';
import {ScaledSheet} from 'react-native-size-matters';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import TextComponent from '../components/text/TextComponent';
import PressableComponent from '../components/pressable/PressableComponent';
import globalStyle from '../globalStyle/globalStyle';

const Accordion = () => {
  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const itemList = useMemo(
    () => [
      {
        title: 'Beauty',
        content: ['lorem', 'ipsum', 'dolor', 'situm', 'bolar'],
        bg: 'red',
      },
      {
        title: 'Is',
        content: ['lorem', 'ipsum', 'dolor', 'situm', 'bolar'],
        bg: 'green',
      },
      {
        title: 'From',
        content: ['lorem', 'ipsum', 'dolor', 'situm', 'bolar'],
        bg: 'blue',
      },
      {
        title: 'Joh',
        content: ['lorem', 'ipsum', 'dolor', 'situm', 'bolar'],
        bg: 'orange',
      },
      {
        title: 'High',
        content: ['lorem', 'ipsum', 'dolor', 'situm', 'bolar'],
        bg: 'brown',
      },
    ],
    [],
  );
  return (
    <Animated.View layout={Layout} style={[accordionStyle.container]}>
      {itemList.map(({bg, content, title}, index) => (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
          key={index.toString()}
          style={[accordionStyle.items]}>
          <TouchableOpacity
            onPress={() => setCurrIndex(index === currIndex ? null : index)}
            style={[
              accordionStyle.items,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
              {
                backgroundColor: bg,
              },
            ]}>
            <TextComponent
              style={[globalStyle.fontSize32, globalStyle.fontWeight700]}>
              {title}
            </TextComponent>

            {index === currIndex &&
              content.map((val, idx) => (
                <TextComponent
                  key={idx.toString()}
                  style={[globalStyle.fontSize14, globalStyle.fontWeight400]}>
                  {val}
                </TextComponent>
              ))}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </Animated.View>
  );
};

const accordionStyle = ScaledSheet.create({
  container: {
    flexGrow: 1,
  },
  items: {
    flexGrow: 1,
  },
});
export default Accordion;
