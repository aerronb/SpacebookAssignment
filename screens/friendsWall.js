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
        allUserPosts: []
      }
    }
  
    componentDidMount() {

      this.getData();
      this.getPost();
    }


  
    getData = async () => {
      const value = await AsyncStorage.getItem('@session_token');
      return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friend_id, {
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
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friend_id + "/post", {
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
                this.setState({
                    isLoading: false,
                    allUserPosts: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addLike = async (params) => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@session_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friend_id + "/post/" + params + "/like", {
            method: 'post',
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
                this.setState({
                    isLoading: false,
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
              {this.state.myFirstName} {this.state.myLastName} PROFILE PAGE
              FRIEND COUNT:{''} {this.state.myFriends}
            </Text>
            <View style={styles.container}>
                    <Text style={styles.centering}>
                    POSTS
                    </Text>
                    <FlatList
                        data={this.state.allUserPosts}
                        renderItem={({ item }) => (
                            <View style={styles.perPost}>
                                <Pressable onPress={() => this.props.navigation.navigate('singlePost', {
                                    info: {
                                        friend_id: this.state.myid,
                                        post_id: item.post_id,
                                    }

                                })}>
                                    <Text>POST ID:{''} {item.post_id}</Text>
                                    <Text>MESSAGE:{''} {item.text}</Text>
                                    <Text>TIME:{''} {item.timestamp}</Text>
                                    <Text>NUMBER OF LIKES:{''} {item.numLikes}</Text>
                                    <TouchableOpacity onPress={ () => {this.addLike(item.post_id)}}>
                                        <Text>Like Post</Text>
                                    </TouchableOpacity>
                                </Pressable>
                            </View>
                        )}
                        keyExtractor={(item, index) => item.post_id.toString()}
                    />
                </View>
 
          </View>
        );
      }
  
    }
  }
  
  
  export default FriendsWall;