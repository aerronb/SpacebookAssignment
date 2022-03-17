import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FriendRequests from '../components/friendRequests';
import ShowAllPeople from '../components/showAllPeople';

import styles from '../styling/styles';


class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.centering}>

                    <Text style={styles.centering}>SearchBar</Text>
                </View>

                <View>
                    <ShowAllPeople />
                </View>

                <View>
                    <Text style={styles.heading2}>
                        PENDING FRIEND REQUESTS
                    </Text>
                    <FriendRequests />
                </View>
            </ScrollView>


        );
    }
}



export default Friends;