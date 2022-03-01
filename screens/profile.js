import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class MyProfile extends Component {

      constructor(props){
        super(props);
    
        this.state = {
          isLoading: true,
          myFirstName: "",
          myLastName: "",
          myEmail: ""

        }
      }
    
      componentDidMount() {
           this.getData();
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }


    
      getData = async () => {
        const value = await AsyncStorage.getItem('@session_token');
            return fetch("http://localhost:3333/api/1.0.0/user/8",{
                method: 'GET',
                headers: {
                    'X-Authorization': value
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    myFirstName: responseJson.first_name,
                    myLastName: responseJson.last_name,
                    myEmail: responseJson.email
                })
            })
            .catch((error) => {
                console.log(error);
            });
          }
    

      render() {
    
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
                <Text>{this.state.myFirstName}</Text>
                <Text>{this.state.myLastName}</Text>
          </View>
          );
        }

      }
    }
const styles = StyleSheet.create({
    Text: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default MyProfile;