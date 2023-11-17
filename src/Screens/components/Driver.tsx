import {View, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Animated, {SharedValue} from 'react-native-reanimated';
import {polar2Canvas} from 'react-native-redash';
// import {} from 'react-native-redash';

interface driverProps {
  radius: number;
  theta: number;
  progress: SharedValue<number>;
}
const Driver: FC<driverProps> = ({radius, theta}) => {
  const center = {x: radius, y: radius};
  const {x, y} = polar2Canvas({radius, theta}, center);

  return (
    <View style={[StyleSheet.absoluteFill]}>
      <Animated.View
        style={[
          driverStyle.circle,
          {
            transform: [
              {
                translateX: x - 25,
              },
              {
                translateY: y - 25,
              },
            ],
          },
        ]}
      />
    </View>
  );
};
const driverStyle = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'cyan',
    borderWidth: 3,
    borderColor: 'black',
  },
});
export default Driver;
