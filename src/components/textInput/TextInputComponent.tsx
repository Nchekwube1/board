import {Platform, TextInput} from 'react-native';
import React, {FC} from 'react';
import TextComponent from '../text/TextComponent';
import {textInputProps} from '../../constants/types/types';
import Box from '../layout/Box';
import globalStyle from '../../globalStyle/globalStyle';
import palette from '../../constants/colors/pallete';
import {
  useAppDispatch,
  useAppSelector,
  useCurrency,
} from '../../constants/utils/hooks';
import ErrorAlert from '../../assets/svgs/errorAlert.svg';
import {
  getContactAuthorizationAndroid,
  parsePhoneNumber,
  removeCurrency,
} from '../../constants/utils/utils';
import PressableComponent from '../pressable/PressableComponent';
import inputStyles from './inputStyles';
import {selectContactPhone} from 'react-native-select-contact';
import ProfileDark from '../../assets/svgs/profileDark.svg';
import ProfileLight from '../../assets/svgs/profileLight.svg';
import {showToast} from '../../reducerSlices/toastSlice';
const TextInputComponent: FC<textInputProps> = ({
  errorText,
  title,
  showBalance,
  secondaryText,
  showContactIcon,
  setValue,
  multiline,
  ...otherInputProps
}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  const dispatch = useAppDispatch();
  const {currency} = useCurrency();
  const {
    userBalance: {AvailableBalance},
  } = useAppSelector(state => state.userBalance);
  const selectContact = async () => {
    if (Platform.OS === 'android') {
      let status = await getContactAuthorizationAndroid();
      //  if (status === 'denied' || status === 'never_ask_again') {
      if (status === 'granted') {
        selectCont();
      } else {
        dispatch(
          showToast({
            status: 2,
            message:
              'We do not have permission to read your contacts, please enable in settings',
          }),
        );
      }
    } else {
      selectCont();
    }
  };
  const selectCont = async () => {
    const selection: any = await selectContactPhone();
    const {selectedPhone} = selection;

    setValue &&
      setValue(
        selectedPhone && selectedPhone.number
          ? parsePhoneNumber(selectedPhone.number)
          : '',
      );
  };
  return (
    <Box style={[globalStyle.w10]}>
      <Box
        style={[
          globalStyle.flexrow,
          globalStyle.alignItemsCenter,
          globalStyle.justifyCenter,
          globalStyle.justifyBetween,
        ]}>
        {title && (
          <TextComponent
            secondary
            style={[
              globalStyle.fontManropeRegular,
              globalStyle.mb0p4,
              globalStyle.fontWeight500,
              globalStyle.fontSize13,
            ]}>
            {title}
          </TextComponent>
        )}
        {showBalance && (
          <>
            {secondaryText ? (
              <TextComponent
                secondary
                style={[
                  globalStyle.fontManropeRegular,
                  globalStyle.fontSize12,
                  globalStyle.mb0p4,
                ]}>
                {secondaryText}
              </TextComponent>
            ) : (
              <TextComponent
                secondary
                style={[
                  globalStyle.fontManropeRegular,
                  globalStyle.fontSize12,
                  globalStyle.mb0p4,
                ]}>
                Account balance: {currency}
                {removeCurrency(AvailableBalance)}
              </TextComponent>
            )}
          </>
        )}
      </Box>

      <Box
        style={[
          globalStyle.w10,
          darkMode && globalStyle.bgTextInputDark,
          !darkMode && globalStyle.bgTextInputLight,
          globalStyle.borderRad,
          globalStyle.flexrow,
          globalStyle.justifyCenter,
          globalStyle.alignItemsCenter,
        ]}>
        <TextInput
          multiline={multiline}
          style={
            [
              globalStyle.textInputHeight,
              globalStyle.flexOne,
              // globalStyle.h10,
              globalStyle.fontManropeRegular,
              globalStyle.pr1,
              globalStyle.pl1,
              globalStyle.fontSize12,
              darkMode && globalStyle.bgTextInputDark,
              !darkMode && globalStyle.bgTextInputLight,
              globalStyle.borderRad,
              globalStyle.textBlackPrimary,
              darkMode && globalStyle.textWhitePrimary,
              // darkMode
              //   ? palette.placeHolderTextDark
              //   : palette.placeHolderTextLight,
              multiline && globalStyle.MultiTextInputHeight,
              multiline && {textAlignVertical: 'top'},
              multiline && globalStyle.pt1p6,
            ] as any
          }
          placeholderTextColor={
            darkMode
              ? palette.placeHolderTextDark
              : palette.placeHolderTextLight
          }
          {...otherInputProps}
        />
        {showContactIcon && (
          <PressableComponent
            onPress={selectContact}
            style={[
              inputStyles.lockView,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
            ]}>
            {darkMode ? (
              <ProfileDark width={20} height={20} />
            ) : (
              <ProfileLight width={20} height={20} />
            )}
          </PressableComponent>
        )}
      </Box>

      {errorText && (
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.alignItemsCenter,
            globalStyle.mt0p8,
          ]}>
          <Box style={[globalStyle.pr0p4]}>
            <ErrorAlert />
          </Box>
          <TextComponent
            style={[
              globalStyle.fontSize10,
              // globalStyle.errorText,
              globalStyle.fontWeight400,
              globalStyle.fontManropeRegular,
            ]}>
            {`${errorText}`}
          </TextComponent>
        </Box>
      )}
    </Box>
  );
};

export default TextInputComponent;
