import React, {FC} from 'react';
import Box from '../layout/Box';
import globalStyle from '../../globalStyle/globalStyle';
import {ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../constants/utils/hooks';
import palette from '../../constants/colors/pallete';

interface loaderProp {
  isTransparent?: boolean;
}
const Loader: FC<loaderProp> = ({isTransparent}) => {
  const {darkMode} = useAppSelector(state => state.darkMode);
  return (
    <Box
      backgroundColor={'mainBackground'}
      flex={1}
      style={[
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
        isTransparent && globalStyle.bgTransparent,
      ]}>
      <ActivityIndicator
        // style={styles.activityIndicator}
        size={'large'}
        color={
          isTransparent
            ? palette.white
            : darkMode
            ? palette.primary50
            : palette.primary10
        }
      />
    </Box>
  );
};

export default Loader;
