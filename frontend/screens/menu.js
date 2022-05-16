import React from 'react';
import { Button, StyleSheet, View, Text,TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Menu({navigation}) {
    return (
      <View>
        <View style={styles.sideMenu}>
          <View style={styles.menuItem}>
            <Text style={{ color: "#2E7D32", fontWeight: "700" , fontSize: 20}}>
              GREEN FRIDGE
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 30,
              borderBottomColor: "white",
              borderBottomWidth: 1
            }}
          />
          <View style={styles.menuItem}>
            <Text style={styles.menuText} onPress={()=> navigation.navigate('Home')}>Home</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText} onPress={()=> navigation.navigate('Profile')}>Profile</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText} onPress={()=> navigation.navigate('Login')}>Login</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText} onPress={()=> navigation.navigate('Register')}>Register</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText} onPress={()=> navigation.navigate('Logout')}>Logout</Text>
          </View>
        </View>
      </View>
    );
  }
  
  let ScreenHeight = Dimensions.get("window").height;
  
  const styles = StyleSheet.create({
    sideMenu: {
      width: "70%",
      backgroundColor: "#AFB42B",
      height: ScreenHeight
    },
    menuItem: {
      marginVertical: "7%",
      alignItems: "center"
    },
    menuText: {
      color: "white",
      fontWeight: "bold"
    }
  });