import React from 'react';
import { Button, StyleSheet, View, Text,TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile({navigation}){
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.nav1}>
          <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
          </View>
          <View style={styles.nav2}>
            <Text style={styles.nav2Text}>
              Welcome User
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

        <View style={{ marginTop: "40%" }}>
        <Text style={styles.profileOptions}>Email Address - </Text>
        <Text style={styles.profileOptions}>Phone Number - </Text>
        <Text style={styles.profileOptions}>Location Saved - </Text>
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
    right: 0,
    padding: 7
  },
  profileOptions: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: "5%"
  },
  back:{
    marginTop: "70%"
  },
  backText: {
    padding: "5%"
  }
  });
  
  