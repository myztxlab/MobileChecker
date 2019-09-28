import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput
} from 'react-native';

import iconav from "../assets/icons/050-checked-symbol.png";
import icondm from "../assets/icons/020-shield-2.png";

import Header from "../components/header";
import strings from "../config/strings";

import {AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ContainerIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      data: [], 
      kosong: ""
    };
  }

  async componentDidMount() {
    const valueusername = await AsyncStorage.getItem("@username")
    const valuepassword = await AsyncStorage.getItem("@password")
    
    if (valueusername == null || valuepassword == null) {
      this.props.navigation.navigate('Login');
    }
    this.getlistcontainerin();
    //const {navigation} = this.props;
    this.props.navigation.addListener ('willFocus', () =>{
      this.getlistcontainerin();
      this.setState({ kosong: "" });
    });
  }

  async getlistcontainerin() {
    this.setState({ spinner: true });
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      
      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "getlistcontainerin",
          depotlocation: "BSA 1"
        }
      });

      if(response.status === 200) {

        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.ErrorMessage);

        if (strResult.includes("OK"))
        {
          //logic mapping data json dari service
          if (response.data.ObjList.length > 0)
          {
            var objlist = response.data.ObjList;
            //const mapobj = objlist.map(x => alert(x));

            const mapobj = objlist.map(function(item) {
              var cont = item.substring(0, 14);
              var size = item.substring(23,27);
              var cond = item.substring(item.length - 2, item.length);
              var cust = item.substring(14,21);
              return {
                cont: cont,
                size: size,
                cond: cond,
                cust: cust
              };
            });
            this.setState({data:mapobj});
            
          }
          // alert(JSON.stringify(response.data.ObjList[2]));
          this.setState({ spinner: false });
        } else { 
          this.setState({ spinner: false });
          Alert.alert("Load Failed", strMessage);
        }
      }else{
        this.setState({ spinner: false });
        Alert.alert("API Failed", "Please try again!");
      }
    } catch(e) {
      this.setState({ spinner: false });
      Alert.alert("Fatal Error", "Please try again! " + e);
    }
  }

  clickEventListener = (item) => {
    // Alert.alert("Item selected: " + item.cont);
    AsyncStorage.setItem("@container", item.cont);
    this.props.navigation.navigate('ContainerInSetLocation');
  }

  changeEventListener = (item) => {
    this.setState({kosong:item});
    if (item.length > 0) {
      let json_filter = this.state.data.filter(e => e.cont.toLowerCase().includes(item.toLowerCase()));
      this.setState({data:json_filter});
    } else { this.getlistcontainerin(); }
  }


  getConditionIcon = (item) => {
    if(item.cond == "AV") {
      return iconav;
    } else {
      return icondm;
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Header></Header>
              <Text>Application Version {strings.text_version}</Text>
          </View>
        </View>
        
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                value={this.state.kosong}
                placeholder="Search"
                underlineColorAndroid='transparent'
                onChangeText={(item) => this.changeEventListener(item)} //{(e) => props_input(e.target.value)}
                //{
                  //(cont_no) => {this.changeEventListener(cont_no)}
                  // (cont_no) => this.setState({cont_no})
                  //}
                  />
          </View>
        </View>

        {
        (this.state.spinner) ? <Spinner visible={this.state.spinner} textContent={'Loading...'} animation='fade' overlayColor='#00b5ec' textStyle={styles.spinnerTextStyle}/> :
        <FlatList 
          style={styles.tasks}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.cont.toString();
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={[styles.card, {borderColor:"#228B22"}]} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={this.getConditionIcon(item)} />
              <View style={styles.cardContent}>
                <Text style={styles.description}>{item.cont}</Text>
                <Text style={styles.detail}>{item.size} | {item.cust} | {item.cond}</Text>
              </View>
            </TouchableOpacity>
          )}}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    //marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00b5ec"
  },
  headerContent:{
    padding:20,
    alignItems: 'center',
  },

  formContent:{
    flexDirection: 'row',
    marginTop:0,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
 },
 icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
saveButton: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:70,
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
    borderRadius:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },

  tasks:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
  },
  image:{
    width:25,
    height:25,
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    flexWrap: 'wrap',
    borderLeftWidth:6,
  },

  description:{
    fontSize:18,
    flex:1,
    color:"#008080",
    fontWeight:'bold',
  },
  detail:{
    fontSize:14,
    flex:1,
    color:"#696969",
    marginTop:5
  },
});  