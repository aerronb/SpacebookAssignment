import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    if (value !== null) {
      this.setState({ token: value });
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  logout = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    await AsyncStorage.removeItem("@session_token");
    return fetch("http://localhost:3333/api/1.0.0/logout", {
      method: "post",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("You have chosen to log out");
          this.props.navigation.navigate("Login");
        } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <Button
          accessibilityLabel="Press to logout"
          accessibilityHint="Logs you out as the current user"
          title="Contiue With Logout"
          color="red"
          onPress={() => this.logout()}
        />
        <Button
          accessibilityLabel="Press for previous screen"
          accessibilityHint="Press to be taken to the previous screen clicked on"
          title="Back to Previous Page"
          color="darkgreen"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default HomeScreen;
