import React, { Component } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class drafts extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }




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
          <Text>DRAFTS </Text>
      </View>
    );
  }
}

export default drafts;