import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';

import MyProfile from '../components/profile';
import styles from '../styling/styles';
import YourFriend from '../components/yourFriends';



class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userPhoto: null,
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
      this.get_profile_image();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  get_profile_image = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    const id =  await AsyncStorage.getItem('@session_id');
    fetch("http://localhost:3333/api/1.0.0/user/" + id + "/photo", {
      method: 'GET',
      headers: {
        'X-Authorization': value
      }
    })
      .then((res) => {
        return res.blob();
      })
      .then((resBlob) => {
        let data = URL.createObjectURL(resBlob);
        this.setState({
          userPhoto: data,
          isLoading: false
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value == null) {
      this.props.navigation.navigate('Login');
    }
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View
          style={styles.loading}>
          <Text>Loading..</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer)} >
              <Image
                source={{
                  uri: this.state.userPhoto,
                }}
                style={styles.photo}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Posts')} >
              <Text>Posts!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('All-Users')} >
              <Text>Find your friends!</Text>
            </TouchableOpacity>

          </View>

          <View>
            <MyProfile />
          </View>

          <View style={styles.edit}>
            <Button
            color= '#808080'
            title="Edit Profile"
            onPress={() => this.props.navigation.navigate('EditProfile')} 
            />
          </View>
          <View style={styles.centering}>
            <Text style={styles.subHeader}>YOUR FRIENDS</Text>
            <YourFriend />
          </View>

          <View>
            <Button
              title="send a new post"
              onPress={ () => this.props.navigation.navigate('FriendsHome')}
            />
          </View>

        </View>


      );
    }

  }
}


export default HomeScreen;