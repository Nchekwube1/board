import {Platform} from 'react-native';
import {ImageLibraryOptions} from 'react-native-image-picker';

export const imagePickerOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  presentationStyle: 'fullScreen',
  includeBase64: true,
  selectionLimit: 1,
};

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*-=`~'".,])[a-zA-Z0-9!@#$%^&*-=`~'".,]{6,64}$/;

export const CashPinText = 'Cashpin';
export const bankName = 'Kuda Bank';
export const appversion = '2.5.2';
export const appLink =
  Platform.OS === 'ios'
    ? 'https://apps.apple.com/ng/app/tribapay-by-stanbuzz/id1630686804'
    : // 'https://apps.apple.com/us/app/tribapay-by-stanbuzz/id1630686804'
      // 'https://play.google.com/store/apps/details?id=com.tribapay';
      'https://play.google.com/store/apps/details?id=com.tribapay&hl=en&gl=US';
export const FONT_REGULAR = 'Manrope-Regular';
export const FONT_SEMI_BOLD_M = 'Mulish-SemiBold';
