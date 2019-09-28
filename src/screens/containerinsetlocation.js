import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import Header from "../components/header";
import strings from "../config/strings";

import {AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class ContainerInSetLocation extends Component {

  constructor(){
    super();
    this.state={
      dataarea: [], 
      datatier: [], 
      datablok: [], 
      datarow: [], 
      spinner: false,
      AreaSelectedVal : '',
      BlokSelectedVal : '',
      RowSelectedVal : '',
      TierSelectedVal : '',
      container: '',
      customer: '',
      sizetype: '',
      condition: '',
      payload: '',
      manufacture: '',
      grade: '',
      location: '',
      pti: '',
      remark: '',
    }
  }

  async componentDidMount() {
    const valueusername = await AsyncStorage.getItem("@username")
    const valuepassword = await AsyncStorage.getItem("@password")
    const valuecontainer = await AsyncStorage.getItem("@container")
    
    if (valueusername == null || valuepassword == null || valuecontainer == null) {
      this.props.navigation.navigate('Login');
    }

    this.setState({ container: valuecontainer });

    this.getallininfo();
    this.getlistarea();
    this.getlisttier();
  }

  async getallininfo() {
    this.setState({ spinner: true });
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      const valuecontainer = await AsyncStorage.getItem("@container")
      
      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "getallininfo",
          cont: valuecontainer
        }
      });

      if(response.status === 200) {

        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.ErrorMessage);

        if (strResult.includes("OK"))
        {
          //logic mapping data json dari service
          var item = response.data.Message;
          var res = item.split(/\r?\n/);
          for (index = 0; index < res.length; ++index) {
            //alert(res[index]);
            if (res[index].includes(':'))
            {
              var isi = res[index].split(': ');
              if (isi[0] == "Cust") { this.setState({ customer: isi[1] });}
              if (isi[0] == "Size") { this.setState({ sizetype: isi[1] });}
              if (isi[0] == "Cond") { this.setState({ condition: isi[1] });}
              if (isi[0] == "Payl") { this.setState({ payload: isi[1] });}
              if (isi[0] == "Mnf") { this.setState({ manufacture: isi[1] });}
              if (isi[0] == "Grade") { this.setState({ grade: isi[1] });}
              if (isi[0] == "Loc") { this.setState({ location: isi[1] });}
              if (isi[0] == "Pti") { this.setState({ pti: isi[1] });}
            }
          }

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

  async getlistarea() {
    this.setState({ spinner: true });
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      
      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "getlistarea"
        }
      });

      if(response.status === 200) {

        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.ErrorMessage);

        if (strResult.includes("OK"))
        {
          //logic mapping data json dari service
          var item = response.data.ObjList;
          this.setState({ dataarea: item });

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

  async getlistblok(area) {
    this.setState({ spinner: true });
    this.setState({AreaSelectedVal: area})
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      
      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "getlistblok",
          area: area
        }
      });

      if(response.status === 200) {
        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.ErrorMessage);

        if (strResult.includes("OK"))
        {
          //logic mapping data json dari service
          var item = response.data.ObjList;
          this.setState({ datablok: item });

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

  async getlistrow(blok) {
    this.setState({ spinner: true });
    this.setState({BlokSelectedVal: blok})
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      
      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "getlistbaris",
          blok: blok
        }
      });

      if(response.status === 200) {
        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.ErrorMessage);

        if (strResult.includes("OK"))
        {
          //logic mapping data json dari service
          var item = response.data.ObjList;
          this.setState({ datarow: item });

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

  async getlisttier() {
    this.setState({ spinner: true });
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      
      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "getlisttier"
        }
      });

      if(response.status === 200) {

        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.ErrorMessage);

        if (strResult.includes("OK"))
        {
          //logic mapping data json dari service
          var item = response.data.ObjList;
          this.setState({ datatier: item });

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

  onClickListener = () => {
    this.savelocation();
  }

  async savelocation() {
    this.setState({ spinner: true });
    try {
      const valueusername = await AsyncStorage.getItem("@username")
      const valuepassword = await AsyncStorage.getItem("@password")
      const valuecontainer = await AsyncStorage.getItem("@container")

      let response = await axios.get("http://139.5.154.40/cyservice/Default.aspx",{
        params: {
          username: valueusername,
          password: valuepassword,
          action: "containerinsetlocation",
          cont: valuecontainer,
          contcard: 0,
          location : this.state.BlokSelectedVal+this.state.RowSelectedVal+this.state.TierSelectedVal
        }
      });

      if(response.status === 200) {

        var strResult = JSON.stringify(response.data.Result);
        var strMessage = JSON.stringify(response.data.Message);

        if (strResult.includes("OK"))
        {
          this.setState({ spinner: false });
          Alert.alert("Info", strMessage);
          if (!strMessage.toLowerCase().includes("error")) {
            this.props.navigation.navigate('ContainerIn');
          }

        } else { 
          this.setState({ spinner: false });
          Alert.alert("Save Failed", "Please try again!");
        }
      }else{
        this.setState({ spinner: false });
        Alert.alert("API Failed", "Please try again!");
      }
    } catch(e) {
      this.setState({ spinner: false });
      Alert.alert("Fatal Error", "Please try again!" + e);
    }
  }

  render() {
    return (
        <View style={styles.container}>
        {
        (this.state.spinner) ? <Spinner visible={this.state.spinner} textContent={'Loading...'} animation='fade' overlayColor='#00b5ec' textStyle={styles.spinnerTextStyle}/> :

        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Header></Header>
              <Text>Application Version {strings.text_version}</Text>
          </View>
        </View>
        }

        <ScrollView>
          <View style={styles.postContent}>
              <Text style={styles.postTitle}>{this.state.container}{'\n'}</Text>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Customer</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.customer}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Size / Type</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.sizetype}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Condition</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.condition}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Payload</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.payload}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Manufacture</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.manufacture}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Grade</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.grade}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Location</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.location}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>PTI</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.pti}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Remark</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={styles.postDescription}>{this.state.remark}</Text>
                </View>
              </View>

              <View style={{ height:20 }}></View>
              
              <Text style={styles.postTitle}>
                Set Location:
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Area</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Picker style={{ width:100 }}
                    selectedValue={this.state.AreaSelectedVal}
                    onValueChange={(itemValue, itemIndex) => this.getlistblok(itemValue)} > 

                    { this.state.dataarea.map((item, key)=>
                    <Picker.Item label={item} value={item} key={key} />
                    )}

                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Blok</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Picker style={{ width:100 }}
                    selectedValue={this.state.BlokSelectedVal}
                    onValueChange={(itemValue, itemIndex) => this.getlistrow(itemValue)} >

                    { this.state.datablok.map((item, key)=>
                      <Picker.Item label={item} value={item} key={key} />
                    )}
                    
                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch' }}>
                  <Text style={styles.postDescription}>Row</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Picker style={{ width:100 }}
                    selectedValue={this.state.RowSelectedVal}
                    onValueChange={(itemValue, itemIndex) => this.setState({RowSelectedVal: itemValue})} >

                    { this.state.datarow.map((item, key)=>
                      <Picker.Item label={item} value={item} key={key} />
                    )}

                  </Picker>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width:100, alignSelf: 'stretch',height: 50 }}>
                  <Text style={styles.postDescription}>Tier</Text>
                </View>
                <View style={{ width:10 }}>
                  <Text style={styles.postDescription}>:</Text>
                </View>
                <View style={{ flex:1}}>
                  <Picker style={{ width:100 }}
                    selectedValue={this.state.TierSelectedVal}
                    onValueChange={(itemValue, itemIndex) => this.setState({TierSelectedVal: itemValue})} >

                    { this.state.datatier.map((item, key)=>
                      <Picker.Item label={item} value={item} key={key} />
                    )}

                  </Picker>
                </View>
              </View>

              <View style={{ height:20 }}></View>
              <TouchableOpacity style={styles.shareButton} onPress={() => this.onClickListener()} >
                <Text style={styles.shareButtonText}>SAVE</Text>  
              </TouchableOpacity> 
          </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    backgroundColor: "#00b5ec"
  },
  headerContent:{
    padding:20,
    alignItems: 'center',
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:22,
    fontWeight:'bold',
  },
  postDescription:{
    fontSize:16,
    marginTop:3,
  },
  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10
  }, 
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  }
});