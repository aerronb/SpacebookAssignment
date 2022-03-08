import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class MyProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      myFirstName: "",
      myLastName: "",
      myEmail: "",
      updateFirstName: "",
      updateLastName: "",
      UpdateEmail: ""
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }



  getData = async () => {
    const id = await AsyncStorage.getItem('@session_id');
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/user/8", {
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
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  update = async () => {
    const id = await AsyncStorage.getItem('@session_id');
    const value = await AsyncStorage.getItem('@session_token');

    let update = {};

    if (this.state.updateFirstName != this.state.myFirstName){
      update['first_name'] = this.state.updateFirstName;
    }

    if (this.state.updateLastName != this.state.myLastName){
      update['last_name'] = this.state.updateLastName;
    }

    if (this.state.UpdateEmail != this.state.myEmail){
      update['email'] = this.state.UpdateEmail;
    }

    return fetch("http://localhost:3333/api/1.0.0/user/8", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': value
      },
      body: JSON.stringify(update)
    })
    .then((response) => {
      if (response.status === 200) {
          return response.json()
      } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
      } else {
          throw 'Something went wrong';
      }
  })
  .catch((error) => {
      console.log(error);
  })
}


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
        <View>
          <Text>{this.state.myFirstName}</Text>
          <Text>{this.state.myLastName}</Text>
          <Text>{this.state.myEmail}</Text>
        </View>
      );
    }

  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
});

export default MyProfile;