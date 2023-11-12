import {ImageBackground} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {useAppSelector, useTribaBg} from '../../constants/utils/hooks';
import LayoutWithSafeArea from './LayoutWithSafeArea';
import globalStyle from '../../globalStyle/globalStyle';
import LayoutWithSafeAreaWithoutScroll from './LayoutWithSafeAreaWithoutScroll';

interface MainLayoutProps {
  children: ReactNode;
  withoutScroll?: boolean;
}
const LayoutWithBG: FC<MainLayoutProps> = ({children, withoutScroll}) => {
  const tribaBG = useTribaBg();
  const {darkMode} = useAppSelector(state => state.darkMode);
  return (
    <>
      {darkMode ? (
        <>
          {withoutScroll ? (
            <LayoutWithSafeAreaWithoutScroll>
              {children}
            </LayoutWithSafeAreaWithoutScroll>
          ) : (
            <LayoutWithSafeArea>{children}</LayoutWithSafeArea>
          )}
        </>
      ) : (
        <ImageBackground source={tribaBG} style={[globalStyle.flexOne]}>
          {withoutScroll ? (
            <LayoutWithSafeAreaWithoutScroll transparent>
              {children}
            </LayoutWithSafeAreaWithoutScroll>
          ) : (
            <LayoutWithSafeArea transparent>{children}</LayoutWithSafeArea>
          )}
        </ImageBackground>
      )}
    </>
  );
};

export default LayoutWithBG;
