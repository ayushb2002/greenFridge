import * as React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        width: "100%",
        height: "80%",
      }}
    >
      <ImageBackground
        source={{uri: photo.uri, height: photo.height, width: photo.width}}
        style={{ height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Save Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default function Home() {
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);

  let camera;

  const __takePic = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };



  const __savePhoto = () => {}
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  const __startCamera = async () => {}
  return (
    <View style={styles.bg}>
      {(previewVisible && capturedImage) ? (
        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
      ) : (
        <Camera
          ref={(r) => {
            camera = r;
          }}
          style={styles.camera}
          type={type}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={__takePic}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </Camera>
      )}
      <View style={styles.frontPageBut}>
        <SafeAreaView style={styles.alternativeLayoutButtonContainer}>
          <TouchableOpacity style={styles.but}>
            <Text style={styles.butText}>MENU</Text>
          </TouchableOpacity>

          <TouchableOpacity onClick={__takePic} style={styles.but2}>
            <Text style={styles.butText}>SNAP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.but}>
            <Text style={styles.butText}>GALLERY</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    width: "90%",
    aligSelf: "flex-end",
    top: 0,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  but: {
    borderRadius: 10,
    backgroundColor: "#7CB342",
    alignItems: "center",
    height: 40,
    width: 60,
    justifyContent: "center",
  },
  butText: {
    color: "white",
    fontWeight: "bold",
  },
  but2: {
    borderRadius: 50,
    backgroundColor: "#7CB342",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  bg: {
    backgroundColor: "black",
  },
  camera: {
    height: "80%",
  },

  frontPageBut: {
    backgroundColor: "pink",
  },
});
