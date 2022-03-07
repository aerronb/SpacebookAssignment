import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ShowAllPeople extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      allUserData: []
    }
  }

  componentDidMount() {
    this.getData();
  }


  getData = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch("http://localhost:3333/api/1.0.0/search", {
          'headers': {
            'X-Authorization':  value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
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
                data={this.state.allUserData}
                renderItem={({item}) => (
                    <View style={styles.container}>
                      <Text>{item.user_givenname}</Text>
                      <Text>{item.user_familyname}</Text>
                      <Button>Add Friend</Button>
                      <Text>{'\n'}</Text>
                    </View>
                )}
                keyExtractor={(item,index) => item.user_id.toString()}
            />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      flexDirection: 'space-around',
    },
  });


export default ShowAllPeople;