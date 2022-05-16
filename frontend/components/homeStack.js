import * as React from 'react';
//import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home'
import Login from '../screens/login'
import Register from '../screens/register'
import Menu  from '../screens/menu';
import Logout from '../screens/logout'
import Profile from '../screens/profile';
import Gallery from '../screens/gallery';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Gallery" component={Gallery} />

    </Stack.Navigator>
  );
}

export default MyStack;