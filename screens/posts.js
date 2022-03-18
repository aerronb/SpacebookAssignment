/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styling/styles";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allUserPosts: [],
      modalVisible: false,
      text: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@session_id");
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, {
      method: "get",
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 403) {
          alert("You can only view the posts on your wall or your friends wall");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          allUserPosts: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  update = async (params) => {
    const update = {};

    if (this.state.updateText != this.state.text) {
      update.post_text = this.state.updateText;
    }
    const id = await AsyncStorage.getItem("@session_id");
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": value,
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully Changed");
          window.location.reload();
        } else if (response.status === 401) {
          alert("You must Login first");
          this.props.navigation.navigate("Login");
        } else if (response.status === 403) {
          alert("You can only change your own posts. Please pick a post you have made.");
          window.location.reload();
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  newPost = async () => {
    const id = await AsyncStorage.getItem("@session_id");
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": value,
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 201) {
          alert("Post has been created. Please refresh to see!");
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 404) {
          alert("Not found");
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  isTextEntered(params) {
    if (!this.state.text.trim()) {
      alert("cannot leave this empty");
    } else {
      this.update(params);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading..</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.centering}>
          POSTS ON YOUR WALL
        </Text>
        <FlatList
          data={this.state.allUserPosts}
          renderItem={({ item }) => (
            <View style={styles.perPost}>
              <Text>
                POST ID:
                {" "}
                {item.post_id}
              </Text>
              <Text>
                MESSAGE:
                {" "}
                {item.text}
              </Text>
              <Text>
                TIME:
                {" "}
                {item.timestamp}
              </Text>
              <Text>
                AUTHOR:
                {" "}
                {item.author.first_name}
                {" "}
                {item.author.last_name}
              </Text>
              <Text>
                NUMBER OF LIKES:
                {" "}
                {item.numLikes}
              </Text>

              <View>
                <Modal
                  animationType="fade"
                  transparent={false}
                  visible={this.state.modalVisible}
                >
                  <View style={styles.center}>
                    <TextInput
                      placeholder="Enter new Text Data"
                      onChangeText={(text) => this.setState({ text })}
                      value={this.state.text}
                    />

                    <Button
                      title="Update"
                      onPress={() => this.isTextEntered(item.post_id)}
                    />

                    <Button
                      title="Close"
                      onPress={() => this.setState({ modalVisible: false })}
                    />
                  </View>
                </Modal>
                <View style={styles.edit}>
                  <Button
                    onPress={() => { this.setState({ modalVisible: true }); }}
                    title="Click To update your post"
                    color="#96AFB8"
                  />
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.post_id.toString()}
        />
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.center}>
            <TextInput
              placeholder="Add your text here"
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
            <Button
              color="#808080"
              title="send New Post To This Page"
              onPress={() => { this.newPost(); }}
            />

            <Button
              title="Close"
              onPress={() => this.setState({ modalVisible: false })}
            />
          </View>
        </Modal>
        <View style={styles.edit}>
          <Button
            title="Click to Add New Post"
            onPress={() => { this.setState({ modalVisible: true }); }}
            color="#808080"
          />
        </View>
      </View>
    );
  }
}

export default Posts;
