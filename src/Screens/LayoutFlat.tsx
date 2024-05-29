import {View, Text, FlatList, ScrollView, Easing} from 'react-native';
import React, {useState} from 'react';
import LayoutWithSafeAreaWithoutScroll from '../components/layout/LayoutWithSafeAreaWithoutScroll';
import Box from '../components/layout/Box';
import globalStyle from '../globalStyle/globalStyle';
import PressableComponent from '../components/pressable/PressableComponent';
import TextComponent from '../components/text/TextComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import palette from '../constants/colors/pallete';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
} from 'react-native-reanimated';
const LayoutFlat = () => {
  const [itemList, setItemList] = useState<any[]>(
    new Array(8).fill('a').map((_, index) => ({
      index,
    })),
  );

  const onPress = () => {
    setItemList(prev => {
      return [...prev, {index: prev.length}];
    });
  };

  const onDelete = (idx: number) => {
    const filt = itemList.filter(val => val?.index !== idx);

    setItemList(filt);
  };

  return (
    <>
      <LayoutWithSafeAreaWithoutScroll>
        <Box flex={1} style={[globalStyle.justifyEnd]}>
          <Animated.View
            entering={SlideInDown}
            exiting={SlideOutDown}
            layout={Layout}
            style={[globalStyle.pt1p6, globalStyle.bgBlack]}>
            {itemList.map(item => (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout}
                style={[globalStyle.px2]}
                key={item?.index}>
                <PressableComponent
                  onPress={() => {
                    onDelete(item?.index);
                  }}
                  style={[
                    globalStyle.py1p2,
                    globalStyle.mb0p8,
                    globalStyle.borderRadius6,
                    globalStyle.bgPurple10,
                    globalStyle.px1p6,
                  ]}>
                  <TextComponent style={[globalStyle.textWhitePrimary]}>
                    {item?.title}
                    {item?.index}
                  </TextComponent>
                </PressableComponent>
              </Animated.View>
            ))}
          </Animated.View>
          {/* <ScrollView>
            {itemList.map((item, index) => (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={[globalStyle.px2]}
                layout={Layout.springify()}
                key={item?.index}>
                <PressableComponent
                  onPress={() => {
                    onDelete(item?.index);
                  }}
                  style={[
                    globalStyle.py1p2,
                    globalStyle.mb0p8,
                    globalStyle.borderRadius6,
                    globalStyle.bgPurple10,
                    globalStyle.px1p6,
                  ]}>
                  <TextComponent style={[globalStyle.textWhitePrimary]}>
                    {item?.title}
                    {item?.index}
                  </TextComponent>
                </PressableComponent>
              </Animated.View>
            ))}
          </ScrollView> */}
          {/* <FlatList
            contentContainerStyle={[globalStyle.px2]}
            data={itemList}
            renderItem={({index, item}) => (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout.springify()}
                key={index + item?.title}>
                <PressableComponent
                  onPress={() => {
                    console.log('click');
                    console.log({
                      index,
                    });

                    const filt = itemList.filter(val => val?.index !== index);
                    console.log({
                      filt,
                    });

                    setItemList(filt);
                  }}
                  style={[
                    globalStyle.py1p2,
                    globalStyle.mb0p8,
                    globalStyle.borderRadius6,
                    globalStyle.bgPurple10,
                    globalStyle.px1p6,
                  ]}>
                  <TextComponent style={[globalStyle.textWhitePrimary]}>
                    {item?.title}
                    {item?.index}
                  </TextComponent>
                </PressableComponent>
              </Animated.View>
            )}
          /> */}
        </Box>
      </LayoutWithSafeAreaWithoutScroll>
      <Box
        position={'absolute'}
        style={[globalStyle.w10, globalStyle.flexrow, globalStyle.justifyEnd]}
        right={20}
        bottom={30}>
        <PressableComponent
          onPress={onPress}
          style={[globalStyle.p1p2, globalStyle.br, globalStyle.bgPurple30]}>
          <AntDesign name="plus" size={20} color={palette.white} />
        </PressableComponent>
      </Box>
    </>
  );
};

export default LayoutFlat;
