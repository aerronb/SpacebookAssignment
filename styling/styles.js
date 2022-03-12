import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    //used across components and screens
    "centering": {
        alignSelf: 'center',
        alignItems: 'center',
    },

    "container": {
        backgroundColor: '#fff',
    },

    "flex": {
        flex: 1,
    },

    //used for isLoading 
    "loading": {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //post
    "heading2":{
        backgroundColor: '#ADD8E6',
    },
    "subHeader": {
        backgroundColor : '#ADD8E6',
        color : "#ffff",
        textAlign : "center",
        paddingVertical : 5,
        marginBottom : 10
      },

    "perPost": {
        borderTopWidth: 3,
        borderTopColor: '#8A4A64',
        
    },

    //friends
    "navBar": {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },

    "searchBar": {
        backgroundColor: 'grey',
        height: 20,
    },

    "formInputsA": {
        padding:5, 
        borderWidth:1, 
        margin:5,
        backgroundColor: "#99F9BC",
    },

    "formInputsD": {
        padding:5, 
        borderWidth:1, 
        margin:5,
        backgroundColor: "#cc0000"
    },

    //profile
    "userText": {
        fontSize: 20,
    },

    "buttonSize": {
        width: 20,
    },

    //home
    "edit": {
        width: 150,
    },
    "photo": {
        width: 50,
        height: 50,
    },

    //login, logout, sign-up
    "formInputs": {
        padding:5, 
        borderWidth:1, 
        margin:5,
    }
  });
