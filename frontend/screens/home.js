import React from 'react';
import { Button, StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({navigation}){
    return(
      <View style={styles.bg}>

        <View style={styles.frontPageBut}>

        <SafeAreaView style={styles.alternativeLayoutButtonContainer}>
         <TouchableOpacity style={styles.but} onPress={()=> navigation.navigate('Menu')}>
         <Text style={styles.butText}>MENU</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.but2}>
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
    but2: {
      borderRadius: 50,
      backgroundColor: "#7CB342",
      alignItems: "center",
      padding: 10,
      justifyContent: "center",
    },
    bg: {
      backgroundColor:"black"
    },

    frontPageBut: {
      backgroundColor: "pink"
    }
  
  });
  
  