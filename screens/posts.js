import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


class posts extends Component {
  constructor(props){
    super(props);

    this.state = {
        isLoading: true,
        allUserPosts: []
    }

  }

  componentDidMount(){
    this.getData
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/7/posts",{
            method: 'GET',
            headers: {
                'X-Authorization': value
            }
        })
        .then((response) => response.json())
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



  render(){
      if (this.state.isLoading){
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
        }else{
          return (
            <View>
            <FlatList
                  data={this.state.allUserPosts}
                  renderItem={({item}) => (
                      <View>
                        <Text>{item.user_givenname} {item.user_familyname}</Text>
                      </View>
                  )}
                  keyExtractor={(item,index) => item.user_id.toString()}
                />
          </View>
          );
        }

      }
    }


export default posts;