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
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
  };

  render() {
    return (
      <View>
        <Button
          title="Contiue With Logout"
          color="red"
          onPress={() => this.logout()}
        />
        <Button
          title="Back to Homepage"
          color="darkgreen"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

export default HomeScreen;
