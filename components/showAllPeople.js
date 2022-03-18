import React, { Component } from "react";
import {
  View, Text, FlatList, Button, TextInput, TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class ShowAllPeople extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allUserData: [],
      find_name: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (find_name) => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/search?q=${this.state.find_name}`, {
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 400) {
          alert("Bad request please try again.");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          allUserData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  send = async (params) => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${params}/friends`, {
      method: "post",
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200 || 201) {
          alert("successfully sent request");
        } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 403) {
          alert("User is already a friend");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
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
        <TextInput
          placeholder="Enter a name"
          onChangeText={(find_name) => this.setState({ find_name })}
          value={this.state.find_name}
          style={styles.formInputs}
        />
        <Button
          title="Find"
          onPress={() => this.getData()}
        />
        <FlatList
          data={this.state.allUserData}
          renderItem={({ item }) => (
            <View style={styles.centering}>
              <Text>{item.user_givenname}</Text>
              <Text>{item.user_familyname}</Text>
              <TouchableOpacity
                style={styles.formInputS}
                onPress={() => {
                  this.send(item.user_id);
                }}
              >
                <Text>SEND FRIEND REQUEST</Text>
              </TouchableOpacity>
              <Text>{"\n"}</Text>
            </View>
          )}
          keyExtractor={(item, index) => item.user_id.toString()}
        />
      </View>
    );
  }
}

export default ShowAllPeople;
