import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import ShowAllPeople from './showAllPeople';


class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
            return (
                <View style={styles.container}>
                    <View style={styles.navBar}>
 
                    <Text>Fill me in!!</Text>
                    </View>

                    <View>
                        <ShowAllPeople/>
                    </View>
                </View>


            );
        }
    }


const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    }
});

export default Friends;