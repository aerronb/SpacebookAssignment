import React, { Component } from 'react';
import { Button, View, ScrollView, TextInput, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyProfile extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            myInfo: [],
        };
    }

    componentDidMount(){
        this.getData();
      }
    
      getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/8", {
              'headers': {
                'X-Authorization':  value
              }
            })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                myInfo: responseJson
            })
        })
        .catch((error) => {
            console.log(error);
        });
      }

        render(){
            if(this.state.isLoading){
                return(
                  <View>
                    <ActivityIndicator/>
                  </View>
                )
              }
          
              return(
                <View>
                  <FlatList
                    data={this.state.myInfo}
                    renderItem={({item}) => <Text>{item.first_name}</Text>}
                    keyExtractor={({id}, index) => id}
                  />
                </View>          
                  );
              }
        }

export default MyProfile;