/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styling/styles";

class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      myFirstName: "",
      myLastName: "",
      myEmail: "",
      myFriends: "",
      allUserPosts: [],
      updateText: "",
      text: "",
      delete: [],
      modalVisible: false,
      post: {
        post_id: "",
        post_text: "",
        post_timestamp: "",
        author_name: "",
        numOfLikes: "",
      },

    };
  }

  componentDidMount() {
    this.getData();
    this.getPost();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  getData = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.info.friend_id}`, {
      method: "get",
      headers: {
        "X-Authorization": value,
      },
    })
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
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.info.friend_id}/post/${this.props.route.params.info.post_id}`, {
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
          post: {
            id: responseJson.post_id,
            text: responseJson.text,
            timestamp: responseJson.timestamp,
            authorFirstName: responseJson.author.first_name,
            authorLastName: responseJson.author.last_name,
            numOfLikes: responseJson.numLikes,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deletePost = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.info.friend_id}/post/${this.props.route.params.info.post_id}`, {
      method: "delete",
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
          alert("You can only delete your own posts.");
        } else {
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          delete: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  update = async () => {
    const update = {};

    if (this.state.updateText !== this.state.text) {
      // eslint-disable-next-line dot-notation
      update["post_text"] = this.state.updateText;
    }
    const value = await AsyncStorage.getItem("@session_token");
    return fetch(`http://localhost:3333/api/1.0.0/user/${this.props.route.params.info.friend_id}/post/${this.props.route.params.info.post_id}`, {
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
          this.setState({ modalVisible: false });
          window.location.reload();
        } else if (response.status === 401) {
          alert("You must Login first");
          this.props.navigation.navigate("Login");
        } else if (response.status === 403) {
          alert("You can only change your own posts. Please pick a post you have made.");
        } else {
          throw "Something went wrong";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //validation for editing text
  isTextEntered() {
    if (!this.state.text.trim()) {
      alert("cannot leave this empty");
    } else {
      this.update();
    }
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
      <View style={styles.flex}>
        <Text style={styles.subHeader}>
          {this.state.myFirstName}
          {" "}
          {this.state.myLastName}
          {" "}
          POST
        </Text>
        <View style={styles.container}>
          <View style={styles.perPost}>
            <Text>
              POST ID:

              {" "}
              {this.state.post.id}
            </Text>
            <Text>
              MESSAGE:

              {" "}
              {this.state.post.text}
            </Text>
            <Text>
              TIME:

              {" "}
              {this.state.post.timestamp}
            </Text>
            <Text>
              Author:

              {" "}
              {this.state.post.authorFirstName}
              {" "}

              {" "}
              {this.state.post.authorLastName}
            </Text>
          </View>
          <View>
            <Button
              accessibilityLabel="delete post"
              accessibilityHint="Delete the post this button resides under"
              title="Delete"
              onPress={() => this.deletePost()}
            />
          </View>
          <View>
            <Modal
              animationType="fade"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <View style={styles.center}>
                <TextInput
                  accessibilityLabel="Enter new text data here"
                  accessibilityHint="Used to change the information in this post to what is entered"
                  placeholder="Enter new Text Data"
                  onChangeText={(text) => this.setState({ text })}
                  value={this.state.text}
                />

                <Button
                  accessibilityLabel="send new post"
                  accessibilityHint="sends data to function which updates text to newly entered text"
                  title="Update"
                  onPress={() => this.isTextEntered()}
                />

                <Button
                  accessibilityLabel="close pop-up modal"
                  accessibilityHint="Closes pop-up to enter edited text"
                  title="Close"
                  onPress={() => this.setState({ modalVisible: false })}
                />
              </View>
            </Modal>

            <Button
            accessibilityLabel="Open pop-up modal"
            accessibilityHint="Press to access modal which lets you enter text to update post"
              title="Click To update your post"
              onPress={() => { this.setState({ modalVisible: true }); }}
            />
            {/* Uses history set in App.js to go back to previous screen than homeScreen */}
            <Button
              accessibilityLabel="You can use this to go back to the previous screen"
              onPress={() => { this.props.navigation.goBack(); }}
              title="Go Back to Friends Wall"
            />
          </View>
        </View>

      </View>
    );
  }
}

export default SinglePost;
