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
import EditProfileScreen from './screens/editUser';
import FriendRequestScreen from './components/friendRequests';
import friendsAllScreen from './screens/friendsHome';
import friendsProfScreen from './screens/friendsWall';
import showAllScreen from './components/showAllPeople';
import singlePostScreen from './screens/singlePost';

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
                    <Drawer.Screen name="All-Users" component={FriendScreen} />
                    <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
                    <Drawer.Screen name="friendRequests" component={FriendRequestScreen} />
                    <Drawer.Screen name="FriendsHome" component={friendsAllScreen} />
                    <Drawer.Screen name="FriendsWall" component={friendsProfScreen} />
                    <Drawer.Screen name="ShowAllPeople" component={showAllScreen} />
                    <Drawer.Screen name="singlePost" component={singlePostScreen} />
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
