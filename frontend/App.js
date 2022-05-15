import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './components/homeStack'
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  React.useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })();
  }, [])
  if (hasPermission === null) {
    return (<View />)
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
