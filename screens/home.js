import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyProfile from './profile';
import { DrawerActions } from '@react-navigation/native';


class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    fetch("http://localhost:3333/api/1.0.0/user/8/photo", {
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
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.jumpTo('Posts'))} >
              <Text>Posts!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.jumpTo('Friends'))} >
              <Text>Find your friends!</Text>
            </TouchableOpacity>

          </View>

          <View>
            <MyProfile />
          </View>
        </View>


      );
    }

  }
}


const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
  }
});

export default HomeScreen;