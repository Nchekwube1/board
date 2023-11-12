import React, {FC, ReactNode} from 'react';
import {useAppSelector} from '../../constants/utils/hooks';
import LayoutWithSafeArea from './LayoutWithSafeArea';
import globalStyle from '../../globalStyle/globalStyle';
import LayoutWithSafeAreaWithoutScroll from './LayoutWithSafeAreaWithoutScroll';
import Box from './Box';

interface MainLayoutProps {
  children: ReactNode;
  withoutScroll?: boolean;
}
const LayoutWithBG: FC<MainLayoutProps> = ({children, withoutScroll}) => {
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
        <Box style={[globalStyle.flexOne]}>
          {withoutScroll ? (
            <LayoutWithSafeAreaWithoutScroll transparent>
              {children}
            </LayoutWithSafeAreaWithoutScroll>
          ) : (
            <LayoutWithSafeArea transparent>{children}</LayoutWithSafeArea>
          )}
        </Box>
      )}
    </>
  );
};

export default LayoutWithBG;
