import * as React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
  Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import axios from "axios";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
        source={{ uri: photo.uri, height: photo.height, width: photo.width }}
        style={{ height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
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

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
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

export default function Home({ navigation }) {
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [name, setName] = React.useState("");

  let camera;

  const __takePic = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true });
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const submitPic = async () => {
    const imgData = capturedImage.base64;
    let location = await Location.getCurrentPositionAsync();
    const data = {
      name,
      posted_by: "email",
      pick_lat: location?.coords?.latitude,
      pick_lng: location?.coords?.longitude,
      img_data: imgData,
      image: "food.jpg",
    };
    try {
      const resp = await axios.post("http://10.21.85.114:8000/api/food", data, {
        headers: { Authorization: `Token` },
      });
      const jsonResp = JSON.parse(resp.data);
      const status = jsonResp?.status;
      console.log(status);
    } catch (err) {
      console.error(err);
    }
    setModalOpen(false);
  };

  const __savePhoto = () => {
    const imgData = capturedImage.base64;
    setModalOpen(true);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __startCamera = async () => {};

  const choosePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setCapturedImage(result);
    }
  };
  return (
    <View style={styles.bg}>
      {previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={__savePhoto}
          retakePicture={__retakePicture}
        />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}
        style={{ width: 100, height: 200 }}
      >
        <TouchableWithoutFeedback onPress={() =>  setModalOpen(!modalOpen)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text>Name</Text>
              <TextInput
                placeholder="Name"
                autoCapitalize="none"
                placeholderTextColor="black"
                style={{ width: "100%" }}
                onChangeText={(val) => setName(val)}
              />

              <TouchableOpacity onPress={submitPic} style={styles.submitBtn}>
                <Text
                  style={{ textAlign: "center", padding: 20, color: "white" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.frontPageBut}>
        <SafeAreaView style={styles.alternativeLayoutButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Menu")}
            style={styles.but}
          >
            <Text style={styles.butText}>MENU</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate('Gallery')} style={styles.but}>
            <Text style={styles.butText}>GALLERY</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 20,
  },
  submitBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "teal",
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
    borderRadius: 5,
    backgroundColor: "#7CB342",
    alignItems: "center",
    height: 50,
    width: 90,
    justifyContent: "center",
  },
  butText: {
    color: "white",
    fontWeight: "bold",
  },
  bg: {

  },
  camera: {
    height: ScreenHeight*0.7,
  },

  frontPageBut: {

  },
});
