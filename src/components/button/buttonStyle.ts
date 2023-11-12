import {ScaledSheet} from 'react-native-size-matters';
import pallete from '../../constants/colors/pallete';

const buttonStyle = ScaledSheet.create({
  buttonBr: {
    borderRadius: '10@s',
    height: '42@s',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: pallete.passCodeGray,
    marginRight: 8,
  },
});

export default buttonStyle;
