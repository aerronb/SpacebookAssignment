import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


class TopNavigator extends Component {
  constructor(props){
    super(props);

    this.state = {
      userPhoto: null,
      isLoading: true
    }
  }
    
  get_profile_image = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    fetch("http://localhost:3333/api/1.0.0/user/8/photo", {
      method: 'GET',
      headers: {
        'X-Authorization': value
      }
    })
    .then((res) => {
      return res.blob();
    })
    .then((resBlob) => {
      let data = URL.createObjectURL(resBlob);
      this.setState({
        userPhoto: data,
        isLoading: false
      });
    })
    .catch((err) => {
      console.log("error", err)
    });
  }

  componentDidMount(){
    this.get_profile_image();
  }
/*Change drawer method */
  toggleDrawer(){
    this.props.navigation.toggleDrawer
  }

  render(){
    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.navigation.toggleDrawer} > 
            <Image
              source={{
                uri: this.state.userPhoto,
              }}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this.props.navigation.navigate('posts')} >
            <Text>Posts!</Text>
          </TouchableOpacity> */}
        </View>
      );
    }else{
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});

export default TopNavigator