import React, { Component } from "react";
import { Button } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  login = async () =>

  // Validation here...

    fetch("http://localhost:3333/api/1.0.0/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 400) {
          throw "Invalid email or password";
        } else {
          throw "Something went wrong";
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem("@session_token", responseJson.token);
        await AsyncStorage.setItem("@session_id", responseJson.id);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });

  render() {
    return (
      <ScrollView>
        <TextInput
          accessibilityLabel="Text input to enter email"
          accessibilityHint="Please enter the email you set-up the account with to login"
          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          style={styles.formInputs}
        />
        <TextInput
          accessibilityLabel="Text input to enter password"
          accessibilityHint="Please enter the password you set-up the account with to login"
          placeholder="Set your password..."
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          style={styles.formInputs}
        />
        <Button
          accessibilityLabel="Press to Login"
          title="Login"
          onPress={() => this.login()}
        />
        <Button
          accessibilityLabel="Press to make a new account"
          accessibilityHint="If an account has not been created you can use this button to take you to make one"
          title="Click here to make an account?"
          color="#90668D"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </ScrollView>
    );
  }
}

export default LoginScreen;
