import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import LogoutScreen from './screens/logout';
import PostScreen from './screens/posts';
import FriendScreen from './screens/friends';
import friendRequests from './screens/friendRequests';

const Drawer = createDrawerNavigator();

class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Friends">
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    <Drawer.Screen name="Signup" component={SignupScreen} />
                    <Drawer.Screen name="Logout" component={LogoutScreen} />
                    <Drawer.Screen name="Posts" component={PostScreen} options={{drawerLabel: () => null}}/>
                    <Drawer.Screen name="Friends" component={FriendScreen} />
                    <Drawer.Screen name="FriendRequests" component={friendRequests} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
