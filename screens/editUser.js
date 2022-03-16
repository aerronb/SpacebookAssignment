import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styling/styles';


class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            first_name: "",
            last_name: "",
            email: "",
            updateFirstName: "",
            updateLastName: "",
            UpdateEmail: ""
        }
    }

    componentDidMount() {
        this.getData();
    }



    getData = async () => {
        const id = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/8", {
            method: 'GET',
            headers: {
                'X-Authorization': value
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    first_name: responseJson.first_name,
                    last_name: responseJson.last_name,
                    email: responseJson.email,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    update = async () => {


        let update = {};

        if (this.state.updateFirstName != this.state.first_name) {
            update['first_name'] = this.state.updateFirstName;
        }

        if (this.state.updateLastName != this.state.last_name) {
            update['last_name'] = this.state.updateLastName;
        }

        if (this.state.UpdateEmail != this.state.email) {
            update['email'] = this.state.UpdateEmail;
        }
        const id = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/8", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': value
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Success Changed")
                } else if (response.status === 401) {
                    this.props.navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
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
                    <TextInput
                        placeholder="Enter first Name"
                        onChangeText={(first_name) => this.setState({ first_name })}
                        value={this.state.first_name}
                    />
                    <TextInput
                        placeholder="Enter Last Name"
                        onChangeText={(last_name) => this.setState({ last_name })}
                        value={this.state.last_name}
                    />
                    <TextInput
                        placeholder="Enter Email"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Button style={styles.buttonSize}
                        title="Update"
                        onPress={() => this.update()}
                    />
                    <Button
                    title="Take a new photo"
                    onPress={() => this.props.navigation.navigate("newPhoto") }
                    />
                </View>
            );
        }

    }
}

export default MyProfile;