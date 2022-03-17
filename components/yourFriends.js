import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styling/styles';


class YourFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            friends: [],
        }
    }
    componentDidMount() {
        this.getData();
    }


    getData = async () => {
        const id = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/friends", {
            'headers': {
                'X-Authorization': value
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    this.props.navigation.navigate("Login");
                } else if (response.status === 403) {
                    alert("Please add this person or add one of their friends!")
                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    friends: responseJson
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
                        data={this.state.friends}
                        renderItem={({ item }) => (
                            <View style={styles.centering}>
                                <Text>{item.user_givenname} {item.user_familyname}</Text>
                                <Text>{item.user_email}</Text>
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

export default YourFriends;