import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TextInputProps} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export interface apiNotifications {
  status: 0 | 1 | 2 | 3;
  message: string;
}
export type SvgProps = {
  icon: any;
  color?: string;
  width?: string;
  fill?: string;
};

export interface dotInterface {
  index: number;
  currentIndex: SharedValue<number>;
}
export interface AuthState {
  alreadyAuth: boolean;
}
export type AuthStackParamList = {
  // registerStack: undefined;
  registerStack: NavigatorScreenParams<RegisterStackParamList>;
  loginStack: NavigatorScreenParams<LoginStackParamList>;
  forgotPassword: NavigatorScreenParams<ForgotStackParamList>;
  updateStack: NavigatorScreenParams<UpdateStackParamsList>;
};

export type RegisterStackParamList = {
  onboardingStack?: undefined;
  signup: undefined;
  emailChecker: undefined;
  emailVerification: undefined;
  getStarted: undefined;
  inputPassword: undefined;
  inputReferral: undefined;
  selectLocation: undefined;
};
export type LoginStackParamList = {
  loginScreen: undefined;
  updatePassword: undefined;
};
export type OnboardingStackParamList = {
  onboarding: undefined;
};
export type ForgotStackParamList = {
  inputEmail: undefined;
  resetPassword: {
    email: string;
  };
};
export type RegisterNavigationProps = NativeStackNavigationProp<
  RegisterStackParamList,
  'onboardingStack'
>;
export type AuthNavigationProps = NativeStackNavigationProp<
  AuthStackParamList,
  'registerStack'
>;
export type ForgotNavigationProps = NativeStackNavigationProp<
  ForgotStackParamList,
  'inputEmail'
>;
export type OnboardingNavigationProps = NativeStackNavigationProp<
  OnboardingStackParamList,
  'onboarding'
>;
export type HolderBottomTabParamList = {
  home: undefined;
  cashpinHome: undefined;
  cardsHome: undefined;
  more: undefined;
};
export type NestedMoreStackParamsList = {
  generateStatement: undefined;
  closeAccount: undefined;
  changeTransPin: undefined;
  changeLoginPassword: undefined;
};
export type UpdateStackParamsList = {
  updateApp: {
    updatetype: string;
  };
};
export type KycStackParamsList = {
  bvnDetails: undefined;
  documentation: undefined;
  kycScreen: undefined;
  selfieCapture: {
    bvnNumber: string;
    bvnName: string;
    dob: Date;
  };
};
export type NestedCashapinStackParamsList = {
  createCashpin: undefined;
  createCashpinWallet: undefined;
  redeemCashpin: undefined;
  walletDetails: {
    batch: string;
  };
  walletHistory: {
    batch: string;
  };
  cashpinDetails: {
    batch: string;
  };
};
export type NestedBillStackParamsList = {
  buyElectricity: undefined;
  buyTv: undefined;
  fundBet: undefined;
  fundBetNga: undefined;
  buyWater: undefined;
};
export type NestedLinkStackParamsList = {
  createPaymentLink: undefined;
  linkHistory: undefined;
  paymentOnboarding: undefined;
  viewAllTransactions: {
    item: any;
  };
  paymentLinkDetail: {
    item: any;
  };
  editPaymentLink: {
    item: any;
  };
};
export type NestedAirtimeStackParamsList = {
  normalAirtime: undefined;
  normalData: undefined;
  cheapAirtime: undefined;
  cheapData: undefined;
  airtime2cash: undefined;
};
export type NestedAirtimeGhanaStackParamsList = {
  normalAirtime: undefined;
  normalData: undefined;
};
export type NestedTransferStackParamsList = {
  transferBank: undefined;
  transferTribapay: undefined;
  ngToNgList: undefined;
  ngToGhList: undefined;
  sendToGhanaAccount: undefined;
  sendToGhanaMomo: undefined;
  sendToGhanaWallet: undefined;
};
export type TransferGhanaStackParamsList = {
  transferBank: undefined;
  transferMomo: undefined;
  transferList: undefined;
  toNigeria: undefined;
  toTribapay: undefined;
};
export type KycGhanaStackParamsList = {
  kycList: undefined;
  documentation: undefined;
};
export type NestedHomeStackParamsList = {
  transactionsList: undefined;
};
export type NestedCardStackParamsList = {
  selectCard: undefined;
  cardInfo: {
    carddata: any;
    breakdown: any;
  };
  cardList: {
    item: any;
  };
  fundCard: {
    carddata: any;
    breakdown: any;
  };
  unloadCard: {
    carddata: any;
  };
  cardTandC: {
    carddata: any;
  };
  cardTransList: {
    carddata: any;
  };
};
export type TransferGhanaNavigationProps = NativeStackNavigationProp<
  TransferGhanaStackParamsList,
  'transferBank'
>;
export type NestedLinkNavigationProps = NativeStackNavigationProp<
  NestedLinkStackParamsList,
  'linkHistory'
>;
export type KycGhanaNavigationProps = NativeStackNavigationProp<
  KycGhanaStackParamsList,
  'kycList'
>;
export type NestedCardNavigationProps = NativeStackNavigationProp<
  NestedCardStackParamsList,
  'cardInfo'
>;
export type KycNavigationProps = NativeStackNavigationProp<
  KycStackParamsList,
  'bvnDetails'
>;
export type NestedBillNavigationProps = NativeStackNavigationProp<
  NestedBillStackParamsList,
  'buyElectricity'
>;
export type AirtimeNavigationProps = NativeStackNavigationProp<
  NestedAirtimeStackParamsList,
  'normalAirtime'
>;
export type AirtimeGhanaNavigationProps = NativeStackNavigationProp<
  NestedAirtimeGhanaStackParamsList,
  'normalAirtime'
>;
export type NestedTransferNavigationProps = NativeStackNavigationProp<
  NestedTransferStackParamsList,
  'transferBank'
>;
export type NestedMorenavigationProps = NativeStackNavigationProp<
  NestedMoreStackParamsList,
  'generateStatement'
>;
export type NestedCashpinavigationProps = NativeStackNavigationProp<
  NestedCashapinStackParamsList,
  'createCashpin'
>;
export type HolderBottomNavigationProps = NativeStackNavigationProp<
  HolderBottomTabParamList,
  'home'
>;

export type MainBottomTabParamList = {
  holderBottomTab: NavigatorScreenParams<HolderBottomTabParamList>;
  nestedCashpin: NavigatorScreenParams<NestedCashapinStackParamsList>;
  nestedMore: NavigatorScreenParams<NestedMoreStackParamsList>;
  nestedTransfer: NavigatorScreenParams<NestedTransferStackParamsList>;
  nestedTransferGhana: NavigatorScreenParams<TransferGhanaStackParamsList>;
  nestedBill: NavigatorScreenParams<NestedBillStackParamsList>;
  nestedAirtime: NavigatorScreenParams<NestedAirtimeStackParamsList>;
  nestedAirtimeGhana: NavigatorScreenParams<NestedAirtimeGhanaStackParamsList>;
  nestedHome: NavigatorScreenParams<NestedHomeStackParamsList>;
  kycStack: NavigatorScreenParams<KycStackParamsList>;
  nestedCard: NavigatorScreenParams<NestedCardStackParamsList>;
  kycGhana: NavigatorScreenParams<KycGhanaStackParamsList>;
  paymentLink: NavigatorScreenParams<NestedLinkStackParamsList>;
  linkMomo: undefined;
  fundGhWallet: undefined;
};
export type MainBottomTabNavigationProps = NativeStackNavigationProp<
  MainBottomTabParamList,
  'holderBottomTab'
>;

export interface textInputProps extends TextInputProps {
  errorText?: string;
  title?: string;
  showBalance?: boolean;
  secondaryText?: string;
  whiteBg?: boolean;
  showContactIcon?: boolean;
  setValue?: (val: string) => void;
}

export type selfieCaptureRouteProp = RouteProp<
  KycStackParamsList,
  'selfieCapture'
>;
export type changeTransPinRouteProp = RouteProp<
  NestedMoreStackParamsList,
  'changeTransPin'
>;
export type changeLoginPasswordRouteProp = RouteProp<
  NestedMoreStackParamsList,
  'changeLoginPassword'
>;
export type walletDetailsRouteProp = RouteProp<
  NestedCashapinStackParamsList,
  'walletDetails'
>;
export type forgotPasswordRouteProp = RouteProp<
  ForgotStackParamList,
  'resetPassword'
>;
export type updateAppRouteProp = RouteProp<UpdateStackParamsList, 'updateApp'>;
export type cashpinDetailRouteProp = RouteProp<
  NestedCashapinStackParamsList,
  'cashpinDetails'
>;
export type walletHistoryRouteProp = RouteProp<
  NestedCashapinStackParamsList,
  'walletHistory'
>;

export type LoginPayloadType = {
  emailaddress: string;
  password: string;
  reqsessionid: string;
  biodevice: string;
  meta: {
    // ipaddress: string;
    useragent: string;
  };
};
export type LoginBioPayloadType = {
  biokey: string;
  biodevice: string;
  reqsessionid: string;
  emailaddress: string;
  meta: {
    // ipaddress: string;
    useragent: string;
  };
};

export interface cashpinCreateType {
  amount: string;
  lockmode: 'YES' | 'NO';
  noofunits: string;
  redeembyone: 'YES' | 'NO';
  pintype: 'NONWALLET' | 'WALLET';
  pinname: string;
  reqsessionid: string;
  //   reqsessionid: 'ffjddodowoowmsdj',
  pincode: '****' | string;
  authmode: 'BIO' | 'PIN';
  biokey: string;
  biodevice: string;
}
export interface creatCardPayload {
  amount: string;
  cardpin: string;
  cardsubclass: 'V1' | 'V2';

  cardclass: 'GOLD1' | 'PLAT1';
  pincode: '****' | string;
  authmode: 'BIO' | 'PIN';
  biokey: string;
  biodevice: string;
  reqsessionid: string;
  cardbrand?: 'Visa' | 'MasterCard';
}

export type momoNetworks = 'MTN' | 'AirtelTigo' | 'Vodafone';

export type billIdentifierType =
  | 'cableTv'
  | 'airtime'
  | 'internet Data'
  | 'electricity'
  | 'betting';
