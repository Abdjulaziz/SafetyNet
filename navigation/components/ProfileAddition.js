import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function BottomBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.boxOne}>Tilføj en person{'\n'}</Text>
      <Text style={styles.boxTwo}>+</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'fff',
      padding: 30,
      alignItems: 'center'
    },
    boxOne: {
      backgroundColor: 'lightgrey',
      paddingHorizontal: 89,
      paddingVertical: 10,
    },
    boxTwo: {
      paddingHorizontal: 119,
      paddingVertical: 40,
      fontSize: 50,
      color: '#15921f',
      backgroundColor: 'lightgrey',
    },
});