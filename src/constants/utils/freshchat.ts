import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
} from 'react-native-freshchat-sdk';
export const InitFreshChatUser = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
) => {
  var freshchatUser = new FreshchatUser();
  freshchatUser.firstName = firstName;
  freshchatUser.lastName = lastName;
  freshchatUser.email = email;
  freshchatUser.phoneCountryCode = '+234';
  freshchatUser.phone = phone;
  Freshchat.setUser(freshchatUser, (error: any) => {
    if (error) {
    }
  });
};
const APP_ID = '9e2130f9-b486-4ad7-9ac3-a3af1f8cc2a3';
const APP_KEY = 'f3681f0b-b627-4aa9-9723-44875930521a';

export const InitFreshChat = () => {
  var freshchatConfig = new FreshchatConfig(APP_ID, APP_KEY);
  freshchatConfig.domain = 'msdk.freshchat.com';
  freshchatConfig.cameraCaptureEnabled = false;
  freshchatConfig.themeName = 'CustomTheme.plist'; //iOS only
  freshchatConfig.stringsBundle = 'FCCustomLocalizable'; //iOS only
  Freshchat.init(freshchatConfig);
};
export const IdentifyFreshChatUser = (email: string) => {
  Freshchat.identifyUser(email, null, (error: any) => {
    if (error) {
    }
  });
};

export const ConfirmRestoreId = async () => {
  await Freshchat.addEventListener(
    Freshchat.EVENT_USER_RESTORE_ID_GENERATED,
    () => {
      Freshchat.getUser(() =>
        // user:any
        {
          // var restoreId = user.restoreId;
          // var externalId = user.externalId;
        },
      );
    },
  );
};

export const GetFreshChatUser = () => {
  Freshchat.getUser(() => {});
};
// export const SetFreshchatNotification = () => {
//   Freshchat.isFreshchatNotification(notification, freshchatNotification => {
//     if (freshchatNotification) {
//       Freshchat.handlePushNotification(notification);
//     } else {
//     }
//   });
// };
