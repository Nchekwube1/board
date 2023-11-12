import {createTheme} from '@shopify/restyle';
import pallete from '../colors/pallete';
const lightTheme = createTheme({
  colors: {
    mainBackground: pallete.whiteBg,
    mainText: pallete.textBlackPrimary,
    tintBg: pallete.lightInput_bg,
    purpleBg: pallete.primary30,
    flatBg: pallete.white,
  },
  spacing: {
    xxs: 4,
    xs: 6,
    s: 8,
    m: 10,
    mm: 12,
    mmm: 14,
    l: 16,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
});
const darkTheme = createTheme({
  colors: {
    mainBackground: pallete.darkBg,
    mainText: pallete.textBlackPrimary,
    tintBg: pallete.darkInput_bg,
    purpleBg: pallete.primary30,
    flatBg: pallete.darkInput_bg,
  },
  spacing: {
    ...lightTheme.spacing,
  },
  breakpoints: {
    ...lightTheme.breakpoints,
  },
});

export type Theme = typeof lightTheme;
export default {lightTheme, darkTheme};
