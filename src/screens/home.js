import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import iconcontainerin from "../assets/icons/043-truck.png";
import iconcontainerout from "../assets/icons/037-cargo-2.png";
import iconshiftingcontainer from "../assets/icons/030-crane-4.png";
import iconsurveyout from "../assets/icons/050-checked-symbol.png";
import iconviewblok from "../assets/icons/045-shipment.png";
import iconsearchcontainer from "../assets/icons/031-cargo.png";
import icontruckindepot from "../assets/icons/033-truck-1.png";
import iconstatuscontainer from "../assets/icons/016-document-1.png";
import icondurationcontainer from "../assets/icons/041-cargo-4.png";
import iconcheckdo from "../assets/icons/009-shield.png";
import iconchangepassword from "../assets/icons/049-back-arrow.png";
import iconsetting from "../assets/icons/011-gear.png";
import iconlogout from "../assets/icons/048-lock.png";

import strings from "../config/strings";

import Header from "../components/header";
import {AsyncStorage} from 'react-native';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: strings.text_menu_containerin, image: iconcontainerin},
        {id:2, title: strings.text_menu_containerout, image: iconcontainerout},
        {id:3, title: strings.text_menu_shiftingcontainer, image: iconshiftingcontainer},
        {id:4, title: strings.text_menu_surveyout, image: iconsurveyout},
        {id:5, title: strings.text_menu_viewblok, image: iconviewblok},
        {id:6, title: strings.text_menu_searchcontainer, image: iconsearchcontainer},
        {id:7, title: strings.text_menu_truckindepot, image: icontruckindepot},
        {id:8, title: strings.text_menu_statuscontainer, image: iconstatuscontainer},
        {id:9, title: strings.text_menu_durationcontainer, image: icondurationcontainer},
        {id:10, title: strings.text_menu_checkdo, image: iconcheckdo},
        {id:11, title: strings.text_menu_changepassword, image: iconchangepassword},
        {id:12, title: strings.text_menu_setting, image: iconsetting},
        {id:13, title: strings.text_menu_logout, image: iconlogout}
      ]
    };
  }

  async componentDidMount() {
    const valueusername = await AsyncStorage.getItem("@username")
    const valuepassword = await AsyncStorage.getItem("@password")
    
    if (valueusername == null || valuepassword == null) {
      this.props.navigation.navigate('Login');
    }
  }

  clickEventListener(item) {
    // Alert.alert(item.title)
    switch(item.title) {
 
      case 'Log Out':
        AsyncStorage.removeItem("@username");
        AsyncStorage.removeItem("@password");
        this.props.navigation.navigate('Login');
        break;
      
      case 'Container In':
        this.props.navigation.navigate('ContainerIn');
        break;
  
      default:
        Alert.alert("No Access","This feature is under development :)");
    
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

        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                <View style={styles.cardFooter}></View>
                <Image style={styles.cardImage} source={item.image}/>
                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    backgroundColor: "#00b5ec"
  },
  headerContent:{
    padding:20,
    alignItems: 'center',
  },
  list: {
    //paddingTop: 12.5,
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6"
  },
  listContainer:{
    alignItems:'center'
  },

  card:{
    borderRadius: 30,
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor:"white",
    flexBasis: '42%',
    marginHorizontal: 10
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 50,
    width: 50,
    alignSelf:'center'
  },
  title:{
    fontSize:16,
    flex:1,
    alignSelf:'center',
    color:"#696969",
    fontWeight:'bold'
  },
  footer: {
    height:54, 
    alignItems:"center", 
    justifyContent:"center"
  },
  bold: {
    fontWeight:"bold"
  },

});    