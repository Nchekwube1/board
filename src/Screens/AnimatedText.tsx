import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useFont, Text, Canvas, Fill} from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ButtonComponent from '../components/button/ButtonComponent';
import globalStyle, {width} from '../globalStyle/globalStyle';

const AnimatedText = () => {
  const fontSize = 32;
  const font = useFont(require('../assets/fonts/Manrope-Medium.ttf'), fontSize);
  const size = font?.measureText('0');
  const textValue = useSharedValue(0);
  const animatedText = useDerivedValue(
    () => `${Math.round(textValue.value)}`,
    [textValue.value],
  );
  useEffect(() => {
    textValue.value = withTiming(10);
  }, []);

  const randomise = () => {
    // textValue.value = withTiming(Math.floor(Math.random() * 4500), {
    //   duration: 1000,
    // });

    // textValue.value = withTiming(textValue.value === 349 ? 290 : 349, {
    textValue.value = withTiming(textValue.value * 2, {
      duration: 1500,
    });
  };
  if (!font) {
    return null;
  }

  return (
    <View style={[globalStyle.flexOne]}>
      <Canvas style={{flex: 1}}>
        <Fill color="white" />
        <Text
          font={font}
          x={width / 2 - (size?.width ?? 0) / 2}
          y={fontSize * 3}
          text={animatedText}
        />
      </Canvas>

      <ButtonComponent title="Random" onPress={randomise} />
    </View>
  );
};

export default AnimatedText;
