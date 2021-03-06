import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import SignupScreen from "./screens/signup";
import LogoutScreen from "./screens/logout";
import PostScreen from "./screens/posts";
import FriendScreen from "./screens/friends";
import EditProfileScreen from "./screens/editUser";
import friendsAllScreen from "./screens/friendsHome";
import friendsProfScreen from "./screens/friendsWall";
import singlePostScreen from "./screens/singlePost";
import photoScreen from "./screens/newPhoto";
import draftScreen from "./screens/drafts";

const Drawer = createDrawerNavigator();
//drawer label null to hide options in the drawer without the user having navigated first
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator backBehavior="history">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Signup" component={SignupScreen} />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
          <Drawer.Screen name="Posts" component={PostScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="All-Users" component={FriendScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="FriendsHome" component={friendsAllScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="FriendsWall" component={friendsProfScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="singlePost" component={singlePostScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="newPhoto" component={photoScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="drafts" component={draftScreen} options={{ drawerLabel: () => null }} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
