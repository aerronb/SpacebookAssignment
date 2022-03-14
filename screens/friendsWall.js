import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';

import MyProfile from '../components/profile';
import styles from '../styling/styles';



class FriendsWall extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        myFirstName: "",
        myLastName: "",
        myEmail: "",
        myFriends: ""
      }
    }
  
    componentDidMount() {
      this.getData();
    }
  
    getData = async () => {
      const id = await AsyncStorage.getItem('@session_id');
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friend_id, {
        method: 'GET',
        headers: {
          'X-Authorization': value
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            myFirstName: responseJson.first_name,
            myLastName: responseJson.last_name,
            myEmail: responseJson.email,
            myFriends: responseJson.friend_count,
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
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
          <View style={styles.flex}>
            <Text style={styles.userText}>
              {this.state.myFirstName} {this.state.myLastName}
              {'\n'}
              Friend Count:{''} {this.state.myFriends}
            </Text>
            <View style={styles.editPost}>
                <Button
                title="EDIT POST"
                color= '#808080'

                />
            </View>
            <View style={styles.deletePost}>
                <Button
                title="DELETE POST"
                color= '#808080'

                />
            </View>
          </View>
        );
      }
  
    }
  }
  
  
  export default FriendsWall;