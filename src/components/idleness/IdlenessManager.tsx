import React, {FC, ReactNode, useState} from 'react';
import UserInactivity from 'react-native-user-inactivity';
import globalStyle from '../../globalStyle/globalStyle';
interface idlenessProps {
  children: ReactNode;
}
const IdlenessManager: FC<idlenessProps> = ({children}) => {
  const [active, setActive] = useState(true);
  const [timer] = useState(4 * (60 * 1000));

  const logUserOut = () => {
    // if (loggedIn) {
    //   dispatch(
    //     showToast({
    //       message: 'You have been logged out due to inactivity',
    //       status: 2,
    //     }),
    //   );
    //   logout();
    // }
  };

  return (
    <UserInactivity
      isActive={active}
      // timeoutHandler={BackgroundTimer as any}
      timeForInactivity={timer}
      onAction={() =>
        // isActive
        {
          // console.log({
          //   active,
          //   isActive,
          // });

          if (active) {
            logUserOut();
          } else {
            setActive(true);
          }
        }
      }
      style={[globalStyle.flexOne]}>
      {children}
    </UserInactivity>
  );
};

export default IdlenessManager;
