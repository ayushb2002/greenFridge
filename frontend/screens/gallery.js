import React from 'react';
import { Button, StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Gallery({navigation}){
    return(
      <View style={styles.bg}>

        <View >
          <View>
            <Text style={styles.heading}> Green Fridge </Text>
          </View>

        <SafeAreaView style={styles.alternativeLayoutButtonContainer}>
         <TouchableOpacity style={styles.but} onPress={()=> navigation.navigate('Menu')}>
         <Text style={styles.butText}>MENU</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.but2}>
         <Text style={styles.butText2}>O</Text>
         </TouchableOpacity>
 
         <TouchableOpacity style={styles.but} onPress={()=> navigation.navigate('Gallery')}>
         <Text style={styles.butText} >GALLERY</Text>
         </TouchableOpacity>
        </SafeAreaView>
        </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      
      width:"90%",
      aligSelf:'flex-end',
      top: 0,
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
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
    butText2: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20
    },
    but2: {
      borderRadius: 50,
      backgroundColor: "#7CB342",
      alignItems: "center",
      width: 50,
      justifyContent: "center",
    },
    bg: {
      
    },

    frontPageBut: {
      
    },
    heading: {
      fontFamily: "Cedarville Cursive",
      color: "#7CB342"
    }
  
  });
  
  