import React, { Component } from "react";
import {
  Button, ScrollView, TextInput, View,
} from "react-native";
import styles from "../styling/styles";

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }

  signup = () => fetch("http://localhost:3333/api/1.0.0/user", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(this.state),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } if (response.status === 400) {
        throw "Failed validation";
      } else {
        throw "Something went wrong";
      }
    })
    .then((responseJson) => {
      console.log("User created with ID: ", responseJson);
      this.props.navigation.navigate("Login");
    })
    .catch((error) => {
      console.log(error);
    });

  isTextEntered() {
    if (!this.state.first_name.trim() || !this.state.last_name.trim() || !this.state.email.trim() || this.state.password.trim()) {
      alert("cannot leave this empty");
    } else {
      this.signup();
    }
  }

  render() {
    return (
      <View style={styles.centering}>
        <TextInput
          accessibilityLabel="enter your first name here"
          accessibilityHint="User information please enter your first name"

          placeholder="Enter your first name..."
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
          style={styles.formInputs}
        />
        <TextInput
          accessibilityLabel="enter your last name here"
          accessibilityHint="User information please enter your last name"

          placeholder="Enter your last name..."
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
          style={styles.formInputs}
        />
        <TextInput
          accessibilityLabel="enter your email here"
          accessibilityHint="User information please enter your email"

          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          style={styles.formInputs}
        />
        <TextInput
            accessibilityLabel="enter your password here"
            accessibilityHint="User information please enter your password"

          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
          style={styles.formInputs}
        />
        <View style={styles.centering}>
          <Button
            accessibilityLabel="For sign-up click here"
            accessibilityHint="uses entered information to add your credentials to the database"
            title="Create an account"
            onPress={() => this.signup()}
          />
        </View>
      </View>
    );
  }
}

export default SignupScreen;
