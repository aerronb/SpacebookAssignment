import React, { Component } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const id = await AsyncStorage.getItem("@session_id");
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
      method: "GET",
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 404) {
          alert("Not Found");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          myFirstName: responseJson.first_name,
          myLastName: responseJson.last_name,
          myEmail: responseJson.email,
          myFriends: responseJson.friend_count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={styles.loading}
        >
          <Text>Loading..</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.userText}>
          First Name:

          {" "}
          {this.state.myFirstName}
          {"\n"}
          Last Name:

          {" "}
          {this.state.myLastName}
          {"\n"}
          Email:

          {" "}
          {this.state.myEmail}
          {"\n"}
          Friend Count:
          {" "}
          {this.state.myFriends}
        </Text>
      </View>
    );
  }
}

export default MyProfile;
