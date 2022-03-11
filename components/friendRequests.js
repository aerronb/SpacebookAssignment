import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styling/styles';


class FriendRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            friendsReqs: []
        }
    }
    componentDidMount() {
        this.getData();
    }


    getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
            'headers': {
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
                    friendsReqs: responseJson
                })
            })
            .catch((error) => {
                console.log(error);
            })
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
                <View>
                    <FlatList
                        data={this.state.friendsReqs}
                        renderItem={({ item }) => (
                            <View style={styles.centering}>
                                <Text>{item.first_name} {item.last_name}</Text>
                                <Text>{'\n'}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => item.user_id.toString()}
                    />
                </View>
            );
        }
    }
}



export default FriendRequests;