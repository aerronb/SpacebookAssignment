import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styling/styles';


class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            allUserPosts: []
        }

    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/8/post", {
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





    render() {

        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text>Loading..</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.centering}>
                    POSTS ON YOUR WALL
                    </Text>
                    <FlatList
                        data={this.state.allUserPosts}
                        renderItem={({ item }) => (
                            <View style={styles.perPost}>
                                <Text>POST ID:{''} {item.post_id}</Text>
                                <Text>MESSAGE:{''} {item.text}</Text>
                                <Text>TIME:{''} {item.timestamp}</Text>
                                <Text>AUTHOR:{''} {item.author.first_name} {item.author.last_name}</Text>
                                <Text>NUMBER OF LIKES:{''} {item.numLikes}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => item.post_id.toString()}
                    />
                </View>
            );
        }
    }
}



export default Posts;