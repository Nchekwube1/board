import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import Box from '../components/layout/Box';
import globalStyle from '../globalStyle/globalStyle';
const SvgPlay = () => {
  return (
    <Box
      style={[
        globalStyle.flexOne,
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
      ]}>
      <Svg height="100%" width="100%" viewBox="0 0 200 200" fill={'red'}>
        {/* <Circle cx="50" cy="50" r="5" fill="red" /> */}
        <Path
          stroke={'red'}
          strokeWidth={1}
          fill={'none'}
          d={'M10 25 C20 15,30 15, 40 25'}
        />
        <Path
          stroke={'yellow'}
          strokeWidth={1}
          fill={'none'}
          d={'M10 25 Q20 15, 40 25'}
        />
        {/* <Path
          stroke={'red'}
          strokeWidth={1}
          fill={'none'}
          d={'M10 25 Q25 10, 40 25 T70 25 T100 25'}
        /> */}
      </Svg>
    </Box>
  );
};

export default SvgPlay;
