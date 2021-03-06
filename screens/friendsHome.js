import React, { Component } from "react";
import {
  View, Text, FlatList, Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styling/styles";

class FriendsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userPhoto: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@session_id");
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          friends: responseJson,
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
        <Text style={styles.subHeader}>CHOOSE A FRIENDS PAGES</Text>
        <FlatList
          data={this.state.friends}
          renderItem={({ item }) => (
            <View style={styles.centering}>
              <Text>
                {item.user_givenname}
                {" "}
                {item.user_familyname}
              </Text>
              <Text>{item.user_email}</Text>
              <Button
                accessibilityLabel="Navigate to chosen friends wall"
                onPress={() => this.props.navigation.navigate("FriendsWall", {
                  friend_id: item.user_id,
                })}
                title="Go to Profile"
                color="#808080"
              />

              <Text>{"\n"}</Text>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </View>
    );
  }
}

export default FriendsHome;
