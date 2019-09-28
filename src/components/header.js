import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import strings from "../config/strings";

export default class Header extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{strings.text_appname}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
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
  }
  }
);