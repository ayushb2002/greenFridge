import * as React from 'react';
//import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home'
import Login from '../screens/login'
import Register from '../screens/register'


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default MyStack;