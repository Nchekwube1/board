import React from 'react';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module 'react-native-freshchat-sdk';
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
