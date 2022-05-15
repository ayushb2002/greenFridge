import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Login(){
    return(
        <View style={styles.alternativeLayoutButtonContainer}>
        <Button color='#7CB342'
        title='Menu'
        
        />
        <Button color='#7CB342'
        title='Snap'
        />
        <Button
        title='Profile'
        color='#7CB342'
        />
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
      bottom:-700,
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  
  });
  
  