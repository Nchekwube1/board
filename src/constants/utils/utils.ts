// let timer: any;
// let lent = 180;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MotiTransitionProp} from 'moti';
import {Easing} from 'react-native-reanimated';
import Geolocation from 'react-native-geolocation-service';
import {Keyboard, PermissionsAndroid, Platform} from 'react-native';
import dayjs from 'dayjs';
import {emailPattern} from './constants';
import {Linking} from 'react-native';
// import '../../../shim';
import InAppBrowser from 'react-native-inappbrowser-reborn';
// var Buffer = require('@craftzdog/react-native-buffer').Buffer;
// import crypto from 'react-native-quick-crypto';
import CryptoJS from 'crypto-js';
// import CryptoJS from 'react-native-crypto-js';
// import crypto from '../../../crypto';
// import {generateSecureRandom} from 'react-native-securerandom';
// import crypto from 'crypto';

import palette from '../colors/pallete';
import {getUniqueId, getDeviceId} from 'react-native-device-info';
export const getCurrentLocation = () => {
  let position: {lat: number | undefined; long: number | undefined} = {
    lat: undefined,
    long: undefined,
  };
  Geolocation.getCurrentPosition(
    location => {
      // console.log({locunfjd: location});

      position = {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      };
    },
    () => {},
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 5,
      showLocationDialog: true,
    },
  );

  return position;
};

export const getAuthorizationIos = () => {
  return Geolocation.requestAuthorization('always');
};
export const getAuthorizationAndroid = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Dot Location Permission',
      message: 'Dot wants to access your location',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
  );
};
export const getContactAuthorizationAndroid = () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Tribapay contact Permission',
      message: 'Tribapay wants to access your contact',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
  );
};

export const secondsToTime = (secs: number) => {
  let minutes = Math.floor(secs / 60);

  let seconds = Math.ceil(secs % 60);

  let obj = {
    m: minutes > 9 ? minutes : `0${minutes}`,
    s: seconds > 9 ? seconds : `0${seconds}`,
  };
  return obj;
};

export const transition: MotiTransitionProp = {
  type: 'timing',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};
export const saveDataToStorage = async (name: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    return e;
  }
  return null;
};
export const loadDataFromStorage = async (val: string) => {
  try {
    const data = await AsyncStorage.getItem(val);
    const parsedData = data != null ? JSON.parse(data) : null;
    return parsedData;
  } catch (e) {
    return e;
  }
};

export const randomisedIDs = () => {
  let items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 13, 14, 15, 16, 17, 18, 19, 12, 10,
  ];
  let id = '';

  for (let i = 0; i < items.length; i++) {
    let rand = Math.floor(Math.random() * items.length);

    id += rand;
  }
  return id;
};
export const capialiseFirst = (name: string) => {
  return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();
};

export function decodeBase64(url: string, format: 'image' | 'video') {
  if (format === 'image') {
    return `data:image/png;base64,${url}`;
  } else {
    return `data:video/mp4;base64,${url}`;
  }
}

export const apostrophe = () => '&#39;';

export const containsLowercase = (val: string) => {
  return /[a-z]/.test(val);
};
export const containsUppercase = (val: string) => {
  return /[A-Z]/.test(val);
};
export const containsSpecial = (val: string) => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val);
};
export const containsOneVal = (val: string) => {
  // return val.length > 0;
  return /\d/.test(val);
};
export const containsEightVal = (val: string) => {
  return val.length > 7;
};
export const checkEmail = (val: string) => {
  return String(val).toLowerCase().match(
    // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    emailPattern,
  );
};
export const isVlidEmail = (val: string) => {
  // return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  return emailPattern.test(val);
};

export function numberWithCommas(x: string | number) {
  if (!x) {
    return '';
  } else {
    return Number(x) % 1 === 0
      ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : Number(x)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
export function numberWithCommasDecomal(x: string | number) {
  if (!x) {
    return '';
  } else {
    return Number(x) % 1 === 0
      ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : Number(x)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
export function numberWithCommasWithDot(x: string | number) {
  if (!x) {
    return '';
  } else {
    const digitSide = x.toString().split('.')?.[0];
    const decimalSide = x.toString().split('.')?.[1];
    return Number(x) % 1 === 0
      ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : decimalSide.length > 2
      ? `${Number(digitSide)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimalSide.slice(0, 2)}`
      : Number(x)
          // .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // const options = {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // };
  // if (!n) {
  //   return '';
  // } else {
  //   7;

  //   let val = Math.round(Number(n) * 100) / 100;
  //   let parts = val.toString().split('.');
  // let num =
  //   parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
  //   (parts[1] ? '.' + parts[1] : '');
  // return num;
  // return n
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   .toLocaleString('en', options);
  // return parseFloat(n.toString()).toFixed(2).toLocaleString();
  // return Number(x) % 1 === 0
  //   ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   : Number(x)
  //       .toFixed(2)
  //       .toString()
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function numberWithoutCommas(x: string) {
  return x.toString().replace(/[,.]/g, '');
  // return x.toString().replace(/[,]/g, '');
}
export function numberWithoutCommasWithdot(x: string) {
  return x.toString().replace(/[,]/g, '');
  // return x.toString().replace(/[,]/g, '');
}

export function trimDecimal(numb: number | string) {
  let formatPounds = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    currency: 'GBP',
  });
  return formatPounds.format(Number(numb));
  // ^(\d+(?:[\.\,]\d{2})?|)$
  //  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(
  //   Number(numb),
  // ),
  // return ('' + numb).replace(
  //   /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
  //   function (m, s1, s2) {
  //     return s2 || s1 + ',';
  //   },
  // );
  // let digitSide = numb.toString().split('.')?.[0];
  // let decimalSide = numb.toString().split('.')?.[1];
  // let decimal = decimalSide
  //   ? decimalSide?.length > 2
  //     ? decimalSide.slice(0, 2)
  //     : decimalSide
  //   : '';
  // console.log({
  //   digitSide,
  //   decimalSide,
  //   decimal,
  // });
  // return `${digitSide}${decimal ? `.${decimal}` : ''}`;
}

export const removeCurrency = (price: string) => {
  return price
    ? price.replace(/₦/g, '').replace(/₵/g, '').replace(/$/g, '').toString()
    : '';
  // return parseFloat(price.replace(/₦/g, '').replace(/$/g, '')).toString();
};

export const nairaSign = () => {
  return '₦';
};
export const cediSign = () => {
  return '₵';
  // return 'Ć';
};
export const dollarSign = () => {
  return '$';
};

export const checkIsNan = (val: string) => {
  return isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10) * 1000;
};

export const capitalizeWord = (word: string) =>
  word[0].toUpperCase() + word.substring(1);

export const asteriskMiddle = (value: string) =>
  value.slice(0, 4) + '****' + value.slice(value.length - 4);

export const isIos = () => Platform.OS === 'ios';
export const isOver18 = (dob: Date) => {
  const nowDate = dayjs(new Date());
  const pickedDate = dayjs(dob);

  return pickedDate.diff(nowDate, 'year') <= -18;
};

export const parsePhoneNumber = (phone: String) => {
  let phoneNum = phone.replace(/[^\d]/g, '');
  // return phoneNum;
  // console.log({phoneNum});

  return phoneNum.startsWith('234') ? '0' + phoneNum.slice(3) : phoneNum;
  // return '0' + phoneNum.slice(3);
};

export const getGreetings = () => {
  var welcome = '';
  var date = new Date();
  var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // if (minute < 10) {
  //   minute =  minute;
  //   // minute = '0' + minute;
  // }
  // if (second < 10) {
  //   second =  second;
  //   // second = '0' + second;
  // }
  if (hour < 12) {
    welcome = 'Good morning!';
  } else if (hour < 17) {
    welcome = 'Good afternoon!';
  } else {
    welcome = 'Good evening!';
  }
  return welcome;
};

export async function openLink(url: string) {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: palette.primary10,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: palette.primary10,
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        // headers: {
        //   'my-custom-header': 'my custom header value',
        // },
      });
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    InAppBrowser.close();
  }
}

export const withSpace = (num: string | number) => {
  try {
    return num.toString().replace(/\B(?=(\d{5})+(?!\d))/g, ' ');
  } catch (error) {
    return 0;
  }
};
export const dismissKeyboard = () => {
  Keyboard.dismiss();
};
export const trimEmail = (email: string) => {
  return email.trim().toLocaleLowerCase();
};

export const getDeviceID = async () => {
  const biodevice = `${await getUniqueId()}${getDeviceId()}`;

  return biodevice;
};
export const segmentpin = (text: String) => {
  try {
    let result = String(text.match(/.{1,4}/g)).replace(/,/g, '  ');
    return result;
  } catch (error) {
    return '';
  }
};
export const isValidText = (text: any) => {
  if (text == null || text === undefined || text === '') {
    return false;
  }
  text = text.toString();
  if (!text.replace(/\s/g, '').length) {
    return false;
  }
  return true;
};
export const ToSentenceCase = (str: string) => {
  if (!isValidText(str)) {
    return '';
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
export const maskPin = (pin: string) => {
  return pin.slice(0, 4) + ' **** **** ' + pin.slice(pin.length - 4);
};

export const generatetxt3 = (cardInfo: any) => {
  if (cardInfo.cardclass === 'STANDARD1') {
    return 'NGN    -    Naira Card';
  } else {
    return 'USD   -   Dollar Card';
  }
};

export const extractnumber = (txt: string) => {
  try {
    let result = txt.toString().replace(/[^0-9]/g, '');
    return result;
  } catch (error) {
    return '';
  }
};

// const tf = (r: string, t: string, e: string, o: string) => {
//   try {
//     const n = crypto.SHA256(t).toString(crypto.enc.Hex),
//       c = crypto.lib.WordArray.random(16),
//       S = r,
//       p = e,
//       y = crypto.enc.Hex.parse(n);
//     let i = crypto.AES.encrypt(S, y, {iv: c}).ciphertext.toString(
//       crypto.enc.Base64,
//     );
//     const s = o;
//     return {s: !0, m: 'done!', d: i, i: c.toString(crypto.enc.Hex), c: p, f: s};
//   } catch (r) {
//     return console.log('me-error', r), {s: !1, m: 'failed!'};
//   }
// };

export const hashRequest2 = (payload: string) => {
  const REACTKEY = 'tpoaswp9zBxL6trtGurirJQjHrG0weM7uP2aSb_39P';
  const PADDEDENCKEY = 'irJQjHr7zBuuPswp9rP2aSbxL6G0weMtpoatrtG_39';
  const ENCKEY = 'G0weMtpoairJQjHr7zBxL6trtGuuP2aSb_39Pswp9r';

  const tf: any = (r: string, t: string, e: string, o: string) => {
    try {
      const n = CryptoJS.SHA256(t).toString(CryptoJS.enc.Hex),
        c = CryptoJS.lib.WordArray.random(16),
        S = r,
        p = e,
        y = CryptoJS.enc.Hex.parse(n);

      let i = CryptoJS.AES.encrypt(S, y, {iv: c}).ciphertext.toString(
        CryptoJS.enc.Base64,
      );

      const s = o;

      return {
        s: !0,
        m: 'done!',
        d: i,
        i: c.toString(CryptoJS.enc.Hex),
        c: p,
        f: s,
      };
    } catch (i) {
      return i;
      // return console.log('me-error', r), {s: !1, m: 'failed!'};
    }
  };

  const encresult = tf(JSON.stringify(payload), REACTKEY, PADDEDENCKEY, ENCKEY);

  const requestpayload = JSON.stringify({
    data: `${encresult?.d}|${encresult?.i}`,
  });
  return requestpayload;
};

type RateExt = {
  type: 'PERCENT' | 'VALUE';
  value: number;
  capped?: number;
};

export const extractFee = (
  fees: RateExt[],
  value: string,
  currency: string,
  noFixed?: boolean,
) => {
  // PERCENT;
  // VALUE;

  const percent = fees?.find(v => v?.type === 'PERCENT')?.value || 0;
  const capped = fees?.find(v => v?.type === 'PERCENT')?.capped || 0;
  const amountFee = noFixed
    ? 0
    : fees?.find(v => v?.type === 'VALUE')?.value || 0;
  const percentFee =
    capped && (percent / 100) * Number(value) > capped
      ? capped
      : (percent / 100) * Number(value);
  const cappedtext = `capped at ${currency} ${capped}`;
  return {
    // totalFee: (percent * Number(value)) / 100 + Number(amountFee),
    totalFee: !value.length ? 0 : percentFee + Number(amountFee),
    feeText: `Total fees: ${percent}% ${
      capped ? cappedtext : ''
    } + ${currency}${amountFee} fixed`,
  };

  // return type
};

export type linkTypes = 'FIXEDSINGLE' | 'MINIMUMSINGLE' | 'ANYAMOUNTSINGLE';
