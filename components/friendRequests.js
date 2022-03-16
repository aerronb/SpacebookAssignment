import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styling/styles';


class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            friendsReqs: [],
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

    accept = async (params) => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + params, {
            method: 'post',
            'headers': {
                'X-Authorization': value,
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("accepted request")
                    window.location.reload(false)
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
    
     delete = async (params) => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + params, {
            method: 'delete',
            'headers': {
                'X-Authorization': value,
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("friend request rejected")
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
                                <TouchableOpacity style={styles.formInputA} onPress={() => {this.accept(item.user_id)} }>
                                    <Text>ACCEPT FRIEND REQUEST</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.formInputD} onPress={() => {this.delete(item.user_id)} }>
                                    <Text>DELETE FRIEND REQUEST</Text>
                                </TouchableOpacity>
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