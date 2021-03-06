import React from 'react';
import { Button, StyleSheet, View, Text,TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Receive({navigation}){
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

        <View style={{ marginTop: "40%", marginLeft: 20}}>
        <Text style={styles.profileOptions}>Latest Donator Name: </Text>
        <Text style={styles.profileOptions}>Latest Donator Location: </Text>
        <Text style={styles.profileOptions}>Donation Received (T/F): </Text>
        <Text style={styles.profileOptionsBtn} onPress={()=> navigation.navigate('Receive')}>Received Donation!</Text>
        
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
  profileOptionsBtn:{
    fontSize: 15,
    textAlign: "left",
    marginVertical: "5%",
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    backgroundColor: "black",
    width: "80%",
    color: "white",
    fontWeight: "bold"
  },
  back:{
    marginTop: "70%"
  },
  backText: {
    padding: "5%"
  }
  });
  
  