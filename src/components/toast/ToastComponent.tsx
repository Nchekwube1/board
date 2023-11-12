import {AnimatePresence, MotiView} from 'moti';
import React, {useEffect, useState} from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useErrorTextColor,
} from '../../constants/utils/hooks';
import Box from '../layout/Box';
import TextComponent from '../text/TextComponent';
import {hideToast} from '../../reducerSlices/toastSlice';
import ToastSuccess from '../../assets/svgs/toastSuccess.svg';
import ToastError from '../../assets/svgs/toastError.svg';
import globalStyle from '../../globalStyle/globalStyle';
const ToastComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const {status, message} = useAppSelector(state => state.apiStatus);
  const {darkMode} = useAppSelector(state => state.darkMode);
  const dispatch = useAppDispatch();
  const errorTextColor = useErrorTextColor();
  useEffect(() => {
    if (message && message !== '') {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        dispatch(hideToast());
      }, 5000);
    } else {
      setShowModal(false);
    }
    return () => clearTimeout(5000);
  }, [message, dispatch]);

  if (message === '' || message === null) {
    return null;
  }
  return (
    <>
      {showModal && (
        <AnimatePresence>
          <MotiView
            from={{
              opacity: 0,
              scale: 0.9,
              transform: [
                {
                  translateY: -50,
                },
              ],
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transform: [
                {
                  translateY: 0,
                },
              ],
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            style={
              [
                globalStyle.apiToast,

                globalStyle.flexrow,
                globalStyle.w9,
                status === 1 && darkMode
                  ? globalStyle.bgToastSuccessLight
                  : globalStyle.bgToastSuccessLight,
                // status === 2 && darkMode
                //   ? globalStyle.bgToastErrorDark
                //   : globalStyle.bgToastErrorLight,
                status === 2 && errorTextColor,
              ] as any
            }>
            <Box
              style={[
                globalStyle.sideWidth,
                globalStyle.h10,
                status === 1 && globalStyle.bgToastSideSuccess,
                status === 2 && globalStyle.bgToastSideError,
              ]}
            />
            <Box
              flex={1}
              style={[
                globalStyle.flexrow,
                globalStyle.alignItemsCenter,
                globalStyle.px1p6,
                globalStyle.py1p2,
                globalStyle.toastBr,
              ]}>
              <Box
                flex={1}
                style={[
                  globalStyle.alignItemsCenter,
                  globalStyle.flexwrap,
                  globalStyle.flexrow,
                ]}>
                <Box style={[globalStyle.pr0p8]}>
                  {status === 1 ? <ToastSuccess /> : <ToastError />}
                </Box>
                <Box flex={1} style={[globalStyle.flexrow]}>
                  <TextComponent
                    style={[
                      status === 1 && globalStyle.textToastSuccess,
                      status === 2 && globalStyle.textToastError,
                    ]}>
                    {message}
                  </TextComponent>
                </Box>
              </Box>
            </Box>
          </MotiView>
        </AnimatePresence>
      )}
    </>
  );
};

export default ToastComponent;
