import React from 'react';
import { Button, StyleSheet, View, Text,TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Storage } from 'expo-storage';
import * as Location from "expo-location";
import Svg, { SvgCssUri } from 'react-native-svg';

export default function Profile({navigation}){
  const [userProfile, setUserProfile] = React.useState({})
  const [userLocation, setLocation] = React.useState({})
  const [donationList, setDonationList] = React.useState([])

  React.useEffect(() => {
    (async () => {
      try {
        const token = await Storage.getItem({key: 'token'})
        if (!token) {
          console.log("Unauthenicated")
          return;
        }
        const getProfile = await axios.get('http://10.21.85.114:8000/api/auth/profile', {headers: {"Authorization": `Token ${token}`}})
        console.log(getProfile.data)
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync()
        setLocation(location)
        setUserProfile(getProfile.data)
        
        // const listResp = await axios.get('http://10.21.85.114:8000/api/food', {params: {user: getProfile?.data?.email}, headers: {"Authorization": `Token ${token}`}})
        // const dt = JSON.parse(listResp.data)
        // console.log(dt.foodItems)
        // setDonationList(dt.foodItems)
      } catch (err) {
        console.error(err)
        if (err.response) {
          console.log(err.response)
        }
      }
    })()
  }, [])
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.nav1}>
          <SvgCssUri
        style={styles.tinyLogo}
        uri={`https://avatars.dicebear.com/api/human/john.svg`}
      />
          </View>
          <View style={styles.nav2}>
            <Text style={styles.nav2Text}>
              Welcome {userProfile?.first_name} {userProfile?.last_name}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: "15%"
            }}
          />
        </View>

        <View style={{ marginTop: "40%", marginLeft: 20 }}>
        <Text style={styles.profileOptions}>Email Address - {userProfile?.email}</Text>
        <Text style={styles.profileOptions}>Location Saved - {userLocation?.coords?.latitude}, {userLocation?.coords?.longitude}</Text>
      </View>

      <View style={{marginTop: 20}}>

      </View>

      <View style={styles.back}>
            <Text style={styles.backText} onPress={()=> navigation.navigate('Home')}> Back to Home</Text>
      </View>

      </View>
    );
}


const styles = StyleSheet.create({
  container:{ 
    width: "100%",
    flex: 1,
    marginTop: 5
},
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 5
  },
  nav1: {
    width: "100%",
    height: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  nav2: {
    width: "100%",
    height: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center"
  },
  nav2Text:{
    alignItems: "center",
    fontSize: 20,
    position: "absolute",
    right: 1,
    padding: 7,
    fontWeight: "bold",
  },
  profileOptions: {
    fontSize: 15,
    textAlign: "left",
    marginVertical: "5%"
  },
  back:{
    marginTop: "70%"
  },
  backText: {
    padding: "5%"
  }
  });
  
  