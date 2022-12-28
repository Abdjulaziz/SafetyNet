import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default class App extends React.Component {

state = {
  location: {},
  errorMessage: ''
}

componentWillMount(){
  this._getLocation();
}

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.Location);

  if (status !== 'granted'){
    console.log('PERMISSION NOT GRANTED');

    this.setState({
      errorMessage: 'PERMISSION NOT GRANTED'
    })
  }

  const location = await Location.getCurrentPositionAsync();

this.setState({
  location,
})

  }

  render() {
    return (
      <View style={styles.container}>
      <Text>{JSON.stringify(this.state.location)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})