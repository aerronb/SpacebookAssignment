/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import {
  View, Text, FlatList, Pressable, Button, TextInput, Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styling/styles";

class FriendsWall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      myFirstName: "",
      myLastName: "",
      myEmail: "",
      myFriends: "",
      text: "",
      allUserPosts: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.getData();
    this.getPost();
  }

  getData = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.friend_id}`, {
      method: "GET",
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          myid: responseJson.user_id,
          myFirstName: responseJson.first_name,
          myLastName: responseJson.last_name,
          myEmail: responseJson.email,
          myFriends: responseJson.friend_count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getPost = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.friend_id}/post`, {
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

  addLike = async (params) => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.friend_id}/post/${params}/like`, {
      method: "post",
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("You have liked this post!");
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 403) {
          alert("You have already liked this post. Please unlike first");
        } else if (response.status === 400) {
          alert("You have already liked this post");
        } else {
          throw "Something went wrong";
        }
      })
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  unLike = async (params) => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.friend_id}/post/${params}/like`, {
      method: "delete",
      headers: {
        "X-Authorization": value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert("You have removed your like from this post");
        } else if (response.status === 401) {
          this.props.navigation.navigate("Login");
        } else if (response.status === 403) {
          alert("You have not liked this post. Please do so first");
        } else {
          throw "Something went wrong";
        }
      })
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  newPost = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.friend_id}/post`, {
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
          throw "Not found";
        } else {
          throw "Something went wrong";
        }
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
      <View style={styles.flex}>
        <Text style={styles.subHeader}>
          {this.state.myFirstName}
          {" "}
          {this.state.myLastName}
          {" "}
          PROFILE PAGE
          FRIEND COUNT:

          {" "}
          {this.state.myFriends}
        </Text>
        <View style={styles.container}>
          <Text style={styles.centering}>
            POSTS
          </Text>
          <FlatList
            data={this.state.allUserPosts}
            renderItem={({ item }) => (
              <View style={styles.perPost}>
                <Pressable 
                accessibilityLabel="Press to see this post alone"
                accessibilityHint="Allows you if the author to edit and delete the post " 
                onPress={() => this.props.navigation.navigate("singlePost", {
                  info: {
                    friend_id: this.state.myid,
                    post_id: item.post_id,
                  },
                })}
                >
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
                    NUMBER OF LIKES:
                    {" "}
                    {item.numLikes}
                  </Text>
                  <View style={styles.edit}>
                    <Button
                      accessibilityLabel="Press to like post"
                      title="Like Post"
                      color="#99F9BC"
                      onPress={() => { this.addLike(item.post_id); }}
                    />

                    <Button
                      accessibilityLabel="Press to unlike post"
                      title="Unlike Post"
                      color="#cc0000"
                      onPress={() => { this.unLike(item.post_id); }}
                    />
                  </View>
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => item.post_id.toString()}
          />
          <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <TextInput
                accessibilityLabel="Text entered to add new post"
                placeholder="Add your text here"
                onChangeText={(text) => this.setState({ text })}
                value={this.state.text}
              />
              <Button
                accessibilityLabel="Press to send new post to friends wall"
                color="#808080"
                title="send New Post To This Page"
                onPress={() => { this.newPost(); }}
              />
            </Modal>
            <Button
              accessibilityLabel="Open modal"
              accessibilityHint="Opens so text can be wrote and sent to the designated persons wall"
              title="Click to Add New Post"
              onPress={() => { this.setState({ modalVisible: true }); }}
            />
          </View>

        </View>

      </View>
    );
  }
}

export default FriendsWall;
