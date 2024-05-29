import React from 'react';
import LayoutWithSafeArea from '../components/layout/LayoutWithSafeArea';
import globalStyle from '../globalStyle/globalStyle';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Paint,
  Path,
  Skia,
  vec,
  mix,
} from '@shopify/react-native-skia';
import Box from '../components/layout/Box';
import LayoutWithSafeAreaWithoutScroll from '../components/layout/LayoutWithSafeAreaWithoutScroll';

const SkiaPlayground = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;
  const strokeWidth = 10;
  const c = vec(width / 2, height / 2);

  const r2 = (width - strokeWidth) / 2;
  const r3 = width / 6;
  const path = Skia.Path.Make();
  path.moveTo(128, 0);
  path.lineTo(168, 80);
  path.lineTo(256, 93);
  path.lineTo(192, 155);
  path.lineTo(207, 244);
  path.lineTo(128, 202);
  path.lineTo(49, 244);
  path.lineTo(64, 155);
  path.lineTo(0, 93);
  path.lineTo(88, 80);
  path.lineTo(128, 0);
  path.close();
  return (
    <LayoutWithSafeAreaWithoutScroll>
      <Box flex={1} style={[globalStyle.px2p4]}>
        {/* <Canvas style={{width, height}}>
          <Group blendMode="multiply">
            <Circle cx={r} cy={r} r={r} color="cyan" />
            <Circle cx={width - r} cy={r} r={r} color="magenta" />
            <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
          </Group>

          <Circle c={c} r={r2} color="red">
            <Paint color="lightblue" />
            <Paint color="#adbce6" style="stroke" strokeWidth={strokeWidth} />
            <Paint
              color="#ade6d8"
              style="stroke"
              strokeWidth={strokeWidth / 2}
            />
          </Circle>

          <Group color="lightblue">
            <LinearGradient
              start={vec(2 * r3, 2 * r3)}
              end={vec(4 * r3, 4 * r3)}
              colors={['#0061ff', '#60efff']}
            />
            <Circle cx={r3} cy={r3} r={r3} />
            <Group style="stroke" strokeWidth={10}>
              <Circle cx={3 * r3} cy={3 * r3} r={r3} />
            </Group>
          </Group>
        </Canvas> */}
        <Canvas style={{flex: 1}}>
          <Path path={path} color="lightblue" />
        </Canvas>
      </Box>
    </LayoutWithSafeAreaWithoutScroll>
  );
};

export default SkiaPlayground;
