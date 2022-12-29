import * as React from 'react';
import { Dimensions, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default function Circle() {
  return (
    <TouchableHighlight
      style = {{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.25,
        backgroundColor:'#fbbc05',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0
      }}
      underlayColor = '#ccc'
      onPress = { () => alert('Yaay!') }
    >
      <Text style={styles.titleText}>J</Text>
    </TouchableHighlight>
    )
  }
  
  const styles = StyleSheet.create({
    titleText: {
      fontSize: 50,
      fontWeight: 'bold',
    }
  })