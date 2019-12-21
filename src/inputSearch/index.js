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

export default class InputSearch extends React.Component {
  state = {
    keyword: '',
    listData: [],
    currentPage: 1,
    refreshing: false,
  };

  componentDidMount = () => {
    // this.fetchSearchData = _.debounce(this.fetchSearchData, 500);
  };

  handleOnChangeText = async text => {
    console.log('saul   ..........', text);
    // if (this.state.keyword === text) return;
    // text = 'sss' + Math.random();
    this.setState(
      {
        keyword: text,
        listData: [],
      },
      this.fetchSearchData,
    );
  };

  fetchSearchData = async () => {
    console.log('saul this.isFetching ', this.isFetching);
    if (this.isFetching) return;
    // this.setState({isFetching: true});
    this.isFetching = true;
    const {keyword} = this.state;
    // console.log('saul 在请求', this.state.isFetching);
    try {
      const data = await api('/upload/video', {query: {keyword}});
      const {listData} = data;
      console.log(
        'saul =============================>>>>',
        this.state.listData,
      );
      console.log('saul isFetching', this.state.isFetching);
      // 此时理应 isFetching 都是 true
      // if (!this.state.isFetching) return;
      this.isFetching = false;

      this.setState({
        listData: this.state.listData.concat(listData),
        currentPage: this.state.currentPage + 1,
        isFetching: false,
      });
    } catch (err) {
      console.log('saul fetchSearchDataError', err);
    }
  };
  handleOnInputFocus = () => {};
  handleOnInputBlur = () => {};

  render() {
    return (
      <View
        style={{
          height,
          backgroundColor: '#eee',
        }}>
        <TextInput
          style={{
            width: 375,
            // height: 50,
            padding: 20,
            backgroundColor: '#FFF',
          }}
          autoFocus={true}
          selectionColor={'#333'}
          onChangeText={text => {
            this.handleOnChangeText(text);
          }}
          onFocus={() => {
            this.handleOnInputFocus();
          }}
          onBlur={() => {
            this.handleOnInputBlur();
          }}
          placeholder="搜你想看"
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          value={this.props.keyword}
        />
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => {
            return null;
          }}
          ListFooterComponent={() => {
            return null;
          }}
          horizontal={false}
          data={this.state.listData}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onEndReached={() => {}}
          onRefresh={() => {}}
        />
      </View>
    );
  }
  renderItem = ({item, index, separators}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Text>{item.title}</Text>
        <Image
          style={{
            width: 375 / 2,
            height: 100,
          }}
          onError={err => {
            console.log('saul loadImageError', err);
          }}
          // source={{uri: item.imageUrl}}
          source={{
            uri: item.imageUrl,
          }}
        />
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({});
