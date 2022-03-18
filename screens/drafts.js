import React, { Component } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class drafts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drafts: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () =>{
    let data = await AsyncStorage.getItem("@draft_text")
    data = JSON.parse(data);
    const drafts = []
    Object.keys(data).forEach((n) => {
      drafts.push(data[n])
    } )
    this.setState({
      drafts
    })
  }

  showData = () => {
    console.log(this.state.drafts)
    return this.state.drafts.map((d) => {
      return(
        <View key={d}>
          <Text>{d}</Text>
        </View>
      )
    })
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
          {this.showData()}
      </View>
    );
  }
}

export default drafts;