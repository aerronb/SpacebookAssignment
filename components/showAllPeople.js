import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styling/styles';


class ShowAllPeople extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            allUserData: [],
            filteredData: []
        }
    }

    componentDidMount() {
        this.getData();
    }


    getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/search", {
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
                    allUserData: responseJson
                })
                console.log(responseJson)
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
                <TextInput style={styles.searchBar} 
                    onChangeText={Text => {
                        this.getData(Text);
                    }}
                />
                    <FlatList
                        data={this.state.allUserData}
                        renderItem={({ item }) => (
                            <View style={styles.centering}>
                                <Text>{item.user_givenname}</Text>
                                <Text>{item.user_familyname}</Text>
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



export default ShowAllPeople;