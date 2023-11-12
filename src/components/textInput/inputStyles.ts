import {ScaledSheet} from 'react-native-size-matters';
import palette from '../../constants/colors/pallete';
const inputStyles = ScaledSheet.create({
  iconView: {
    position: 'absolute',
    right: 0,
    width: '38@s',
  },
  lockView: {
    // position: 'absolute',
    // left: 0,
    width: '35@s',
  },
  br8: {
    borderRadius: '8@s',
  },
  br12: {
    borderRadius: '12@s',
  },
  borwidth: {
    borderColor: palette.inputTextBorder,
    borderWidth: 1,
  },
  borTransparent: {
    borderColor: 'transparent',
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: palette.primary,
  },
  pinInput: {
    flexDirection: 'row',
    marginVertical: 20,
    padding: 17,
    borderRadius: 50,
  },
  pin: {
    width: '42@s',
    height: '46@s',
    marginHorizontal: '5@s',
  },
  borderRed: {
    borderColor: palette.error,
  },
  line: {
    width: '1@s',
    height: '20@s',
    backgroundColor: palette.black,
  },
} as Record<any, any>);

export default inputStyles;
