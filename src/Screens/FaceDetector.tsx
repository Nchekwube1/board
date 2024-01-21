import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import React, {createRef, useState} from 'react';
import globalStyle, {width} from '../globalStyle/globalStyle';
import {RNCamera} from 'react-native-camera';
import palette from '../constants/colors/pallete';
import ButtonComponent from '../components/button/ButtonComponent';
import TextComponent from '../components/text/TextComponent';

const previewSize = width;
const FaceDetector = () => {
  const [box, setBox] = useState<any>(null);
  const camera = createRef<RNCamera>();
  const [image, setImage] = useState<any>({});

  const handlerFace = ({faces}: any) => {
    console.log({
      faces,
    });

    if (faces[0]) {
      setBox({
        boxs: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
        bottomMounthPosition: faces[0].bottomMounthPosition,
      });
    } else {
      setBox(null);
    }
  };

  const takePicture = async () => {
    if (box && camera && camera.current && camera.current.takePictureAsync) {
      const options = {quality: 0.4};
      // try {
      const response = await camera?.current?.takePictureAsync(options);
      if (response && response?.uri) {
        setImage({
          name: 'photo.jpg',
          type: 'image/png',
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        });
        // setModal(false);
      }
      // } catch {
      //     Alert.alert('An error ocurreduu', 'Failed photo capture');
      // }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mask}>
        {image.uri ? (
          <Image
            style={[globalStyle.w10, globalStyle.h10]}
            source={{
              uri: image?.uri,
            }}
          />
        ) : (
          <RNCamera
            ref={camera}
            captureAudio={false}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            onFacesDetected={handlerFace}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            playSoundOnCapture={false}
            faceDetectionLandmarks={
              RNCamera.Constants.FaceDetection.Landmarks
                ? RNCamera.Constants.FaceDetection.Landmarks.all
                : undefined
            }
            faceDetectionClassifications={
              RNCamera.Constants.FaceDetection.Classifications
                ? RNCamera.Constants.FaceDetection.Classifications.all
                : undefined
            }
          />
        )}
        {box && !image.uri && (
          <>
            <View
              style={styles.bound(
                box.boxs.width,
                box.boxs.height,
                box.boxs.x,
                box.boxs.y,
              )}
            />
          </>
        )}
      </View>
      <View
        style={{
          paddingHorizontal: 25,
          width: '100%',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <TextComponent>Please place your face in the box.</TextComponent>
        {box && (
          <ButtonComponent
            title={image.uri ? 'Retake Picture' : 'Take Picture'}
            onPress={() => {
              if (image.uri) {
                setImage({});
              } else {
                takePicture();
              }
            }}
          />
          //   <Text onPress={takePicture} style={styles.box}>
          //     Take Picture
          //   </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  containerForm: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  bound: (widt: number, height: number, x: number, y: number) => {
    return {
      position: 'absolute',
      top: y,
      left: x,
      height,
      width: widt,
      borderWidth: 5,
      borderColor: 'white',
      //   borderRadius: 4000,
      zIndex: 3000,
    };
  },
  mask: {
    borderRadius: previewSize / 1.5,
    borderColor: palette.secondaryBg,
    borderWidth: 10,
    height: previewSize - 40,
    width: previewSize - 40,
    marginTop: 80,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  preview: {
    width: 0.9 * width,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 20,
    borderWidth: 2,
    width: '100%',
    marginTop: 25,
    textAlign: 'center',
    borderColor: palette.primary,
    fontSize: 18,
    color: palette.textBlackPrimary,
    fontFamily: 'Montserrat-Medium',
    backgroundColor: palette.secondaryBg,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default FaceDetector;
