import {View, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
import globalStyle from '../../globalStyle/globalStyle';

interface driverProps {
  radius: number;
  theta: number;
  progress: SharedValue<number>;
}
const size = 50;
const Driver: FC<driverProps> = ({radius, progress}) => {
  const center = {x: radius, y: radius};
  const style = useAnimatedStyle(() => {
    const theta = interpolate(progress.value, [0, 1], [0, 2 * Math.PI]);
    const {x, y} = polar2Canvas({radius, theta}, center);

    return {
      transform: [
        {
          translateX: x - size / 2,
        },
        {
          translateY: y - size / 2,
        },
      ],
    };
  });
  return (
    <View style={[StyleSheet.absoluteFill, globalStyle.br]}>
      <Animated.View
        style={[driverStyle.circle, globalStyle.absolute, style]}
      />
    </View>
  );
};
const driverStyle = StyleSheet.create({
  circle: {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: 'red',
    borderWidth: 3,
    borderColor: 'black',
  },
});
export default Driver;
