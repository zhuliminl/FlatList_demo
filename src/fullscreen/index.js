/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-root-toast';
import _ from 'lodash';
import api from '../utils/api';
const {width, height} = Dimensions.get('window');

const toast = str => {
  Toast.show(str);
};

export default class FullScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>xxxxx</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
