import React, { Component } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styling/styles';



class FriendsWall extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        myFirstName: "",
        myLastName: "",
        myEmail: "",
        myFriends: "",
        allUserPosts: [],
        post: {post_id: null, post_text: null, post_timestamp: null, author_name: null, numOfLikes: null,}
      }
    }
  
    componentDidMount() {
      this.getData();
      this.getPost();

    }


  
    getData = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.info.friend_id, {
        method: 'GET',
        headers: {
          'X-Authorization': value
        }
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
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getPost = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.info.friend_id + "/post/" + this.props.route.params.info.post_id , {
            method: 'get',
            headers: {
                'X-Authorization': value
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    this.props.navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    post: {
                        id: responseJson.post_id,
                        text: responseJson.text,
                        timestamp: responseJson.timestamp,
                        authorFirstName: responseJson.author.first_name,
                        authorLastName: responseJson.author.last_name,
                        numOfLikes: responseJson.numLikes
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

  
    render() {
    
      if (this.state.isLoading) {
        return (
          <View
            style={styles.loading}>
            <Text>Loading..</Text>
          </View>
        );
      } else {
        return (
            <View style={styles.flex}>
                <Text style={styles.subHeader}>
                {this.state.myFirstName} {this.state.myLastName} POSTS
                </Text>
            <View style={styles.container}>
                    <Text style={styles.centering}>
                    POSTS
                    </Text>
                        <View style={styles.perPost}>
                            <Text>POST ID:{''} {this.state.post.id}</Text>
                            <Text>MESSAGE:{''} {this.state.post.text}</Text>
                            <Text>TIME:{''} {this.state.post.timestamp}</Text>
                            <Text>Author:{''} {this.state.post.authorFirstName} {''} {this.state.post.authorLastName}</Text>
                        </View>
            </View>
 
        </View>
        );
      }
  
    }
  }
  
  
  export default FriendsWall;