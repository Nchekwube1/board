declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
{
  import {SvgProps} from 'react-native-svg';
  // eslint-disable-next-line no-undef
  const content: React.FC<SvgProps>;
  export default content;
}
