/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  List,
  FormInput,
  FormLabel
} from 'react-native-elements';
import ElevatedView from 'react-native-elevated-view';
import Frisbee from 'frisbee';

const api = new Frisbee({
  baseURI: 'http://www.omdbapi.com?',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});





export default class Cinegeeks extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: null,
      movies: null,
      searched: false
    };
  }

  makeRequests = async(search) => {
    try {

      // make the request
      let res = await api.post('s='+search);
      //console.log('response', res.body);
      let movies = res.body.Search;
      this.setState({
        movies: movies
      });
      // handle HTTP or API errors
      if (res.err) throw res.err;
      console.log(movies);

    }
    catch (err) {
      throw err;
    }
    if (this.state.movies) {
      this.setState({
        searched: true
      });
    }
  }

  renderData = () => {
    let movies = this.state.movies.map(m => ({
      title: m.Title,
      poster: m.Poster,
      year: m.Year
    }));
    return (
      <ScrollView>
        <List>
          {
            movies.map((m, i) => (
              <ElevatedView key={i} elevation={1} style={styles.card}>
                <Text style={styles.welcome}>
                  {m.title}
                </Text>
                <Text style={styles.instructions}>
                  {m.year}
                </Text>
              </ElevatedView>
            ))
          }
        </List>
      </ScrollView>
    );
  }

  changeText = (text) => {
    this.setState({
      search: text
    });
  }

  render() {
    let search = this.state.search;
    return (
      <View style={styles.container}>
        <FormLabel>Search Some Movie</FormLabel>
        <FormInput
          placeholder='Some Movie'
          onChangeText={this.changeText}
          onSubmitEditing={() => this.makeRequests(search)}
        />
        {this.state.searched ? this.renderData() : <View/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  card: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'stretch',
    height: 200,
    margin: 15
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  instructions: {
    color: '#333333',
    margin: 10,
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Cinegeeks', () => Cinegeeks);