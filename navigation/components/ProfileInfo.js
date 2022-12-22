import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Sandbox() {
  return (
    <View style={styles.container}>
      <Text style={styles.boxOne}>Oplysninger{'\n'}</Text>
      <Text style={styles.boxTwo}>Navn{'\n'}John Doe</Text>
      <Text style={styles.boxThree}>E-mail{'\n'}JohnDoe@gmail.com</Text>
      <Text style={styles.boxFour}>Telefon{'\n'}+45 12 34 56 78</Text>
    </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 30,
    },
    boxOne: {
      backgroundColor: 'lightgrey',
      padding: 10,
    },
    boxTwo: {
      backgroundColor: 'lightgrey',
      padding: 10,
    },
    boxThree: {
      backgroundColor: 'lightgrey',
      padding: 10,
    },
    boxFour: {
      backgroundColor: 'lightgrey',
      padding: 10,
    },
  });


