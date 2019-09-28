import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import bgimage from "../assets/images/bgimage.jpg";
import iconuser from "../assets/icons/001-user.png";
import iconpwd from "../assets/icons/048-lock.png";
import strings from "../config/strings";
import {AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      spinner: false,
    }
  }

  async componentDidMount() {
    this.setState({ spinner: false });
  }

  onClickListener = (viewId) => {
      this.login();
  }

  async login() {
    this.setState({ spinner: true });
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      
      if (valueusername !== null || valuepassword !== null) {
        AsyncStorage.removeItem("@username");
        AsyncStorage.removeItem("@password");
      }

      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: this.state.username,
          password: this.state.password,
          action: "login",
          depotlocation: "BSA 1"
        }
      });

      if(response.status === 200) {

        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.Message);

        if (strResult.includes("OK") && strMessage.includes("|"))
        {
          this.setState({ spinner: false });
          AsyncStorage.setItem("@username", this.state.username);
          AsyncStorage.setItem("@password", this.state.password);
          // Alert.alert("Success", "Login OK");
          //redirect to home
          this.props.navigation.navigate('Home');

        } else { 
          this.setState({ spinner: false });
          AsyncStorage.removeItem("@username");
          AsyncStorage.removeItem("@password");
          Alert.alert("Login Failed", "Username or Password is invalid!");
        }
      }else{
        this.setState({ spinner: false });
        AsyncStorage.removeItem("@username");
        AsyncStorage.removeItem("@password");    
        Alert.alert("API Failed", "Please try again!");
      }
    } catch(e) {
      this.setState({ spinner: false });
      AsyncStorage.removeItem("@username");
      AsyncStorage.removeItem("@password");    
      // Alert.alert("Fatal Error", JSON.stringify(e));
      Alert.alert("Fatal Error", "Please try again!");
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <Image style={styles.bgimage} source={bgimage} />

        <View style={styles.header}>
          <Text style={styles.title}>{strings.text_appname}</Text>
        </View>

        <View style={styles.forminput}>
          <TextInput style={styles.textinput}
              placeholder={strings.text_username}
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
          <Image style={styles.imgtextinput} source={iconuser}/>
        </View>
        
        <View style={styles.forminput}>
          <TextInput style={styles.textinput}
              placeholder={strings.text_password}
              secureTextEntry={true} autoCompleteType="password" autoCorrect={false}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
          <Image style={styles.imgtextinput} source={iconpwd}/>
        </View>
        
        {
        (this.state.spinner) ? <Spinner visible={this.state.spinner} textContent={'Loading...'} animation='fade' overlayColor='#00b5ec' textStyle={styles.spinnerTextStyle}/> :
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>{strings.text_login}</Text>
        </TouchableOpacity>
        }

        <View style={styles.footer}>
          <Text style={styles.bold}>Application Version {strings.text_version}</Text>
          <Text style={styles.bold}>Copyright 2019</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  bgimage: {
    flex: 1, 
    resizeMode: "contain", 
    alignSelf: "center", 
    position: 'absolute', 
    justifyContent: 'center'
  },
  header: {
    height:100, 
    alignItems:"center", 
    justifyContent:"center"
  },
  title: {
    fontSize:30, 
    fontWeight:"bold", 
    shadowColor: "#808080", 
    shadowOffset: { 
      width: 0, 
      height: 2
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5
  },
  forminput: {
    borderBottomColor: '#F5FCFF', 
    backgroundColor: '#FFFFFF', 
    borderRadius:30, 
    borderBottomWidth: 1, 
    width:300, 
    height:45, 
    marginBottom:20, 
    flexDirection: 'row', 
    alignItems:'center', 
    shadowColor: "#808080", 
    shadowOffset: { 
      width: 0, 
      height: 2
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5
  },
  textinput: {
    height:45, 
    marginLeft:16, 
    borderBottomColor: '#FFFFFF', 
    flex:1
  },
  imgtextinput: {
    width:30, 
    height:30, 
    marginRight:15, 
    justifyContent: 'center'
  },
  bold: {
    fontWeight:"bold"
  },
  footer: {
    height:54, 
    alignItems:"center", 
    justifyContent:"center"
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold'
  },
  spinnerTextStyle: {
    color: '#FFFFFF'
  }
}); 