import React, { Component } from 'react';
import { Button, ScrollView, TextInput, View } from 'react-native';
import styles from '../styling/styles';

class SignupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }

    signup = () => {


        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json()
                } else if (response.status === 400) {
                    throw 'Failed validation';
                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                console.log("User created with ID: ", responseJson);
                this.props.navigation.navigate("Login");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    isTextEntered () {
    if(!this.state.first_name.trim() || !this.state.last_name.trim() || !this.state.email.trim() || this.state.password.trim()){
            alert("cannot leave this empty");
        }
        else{
            this.update()
        }
    }

    render() {
        return (
            <View style={styles.centering}>
                <TextInput
                    placeholder="Enter your first name..."
                    onChangeText={(first_name) => this.setState({ first_name })}
                    value={this.state.first_name}
                    style={styles.formInputs}
                />
                <TextInput
                    placeholder="Enter your last name..."
                    onChangeText={(last_name) => this.setState({ last_name })}
                    value={this.state.last_name}
                    style={styles.formInputs}
                />
                <TextInput
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    style={styles.formInputs}
                />
                <TextInput
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    secureTextEntry
                    style={styles.formInputs}
                />
                <View style={styles.centering}>
                    <Button
                        title="Create an account"
                        onPress={() => this.signup()}
                    />
                </View>
            </View>
        )
    }
}

export default SignupScreen;