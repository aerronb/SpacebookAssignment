import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
} from "react-native";
import styles from "../styling/styles";

class newDraft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draft: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("draft")
      .then((value) => this.setState({ draft: value }));

    setDraft = (value) => {
      AsyncStorage.setItem("draft", value);
      this.setState({ draft: value });
    };
  }

  render() {
    return (
      <View style={styles.centering}>
        <TextInput
          placeholder="Enter your Draft.."
          onChangeText={(draft) => this.setState({ draft })}
          value={this.state.draft}
          style={styles.formInputs}
        />
        <View style={styles.centering}>
          <Button
            title="Create Draft"
            onPress={() => this.save()}
          />

          <Button
            title="GET Draft"
            onPress={() => this.getDraft()}
          />
          <Text>{draft}</Text>
        </View>
      </View>
    );
  }
}

export default newDraft;
